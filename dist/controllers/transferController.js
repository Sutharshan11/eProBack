"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransferStatus = exports.getTransfers = exports.requestTransfer = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const transferSchema = zod_1.z.object({
    assetId: zod_1.z.number(),
    toBranchId: zod_1.z.number(),
    reason: zod_1.z.string().optional(),
});
const requestTransfer = async (req, res) => {
    try {
        const { assetId, toBranchId, reason } = transferSchema.parse(req.body);
        const userId = req.user?.id;
        // Check if asset exists and belongs to user's branch (or admin override)
        const asset = await prisma_1.default.asset.findUnique({ where: { id: assetId } });
        if (!asset)
            return res.status(404).json({ message: 'Asset not found' });
        // Validate permission: Branch Manager can only transfer FROM their branch
        if (req.user?.role === 'BRANCH_MANAGER' && asset.branchId !== req.user.branchId) {
            return res.status(403).json({ message: 'You can only transfer assets from your own branch' });
        }
        const transfer = await prisma_1.default.transferRequest.create({
            data: {
                assetId,
                fromBranchId: asset.branchId,
                toBranchId,
                status: 'PENDING',
                reason,
            },
        });
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'TRANSFER_REQUESTED',
                userId,
                details: `Requested transfer to branch ${toBranchId}`,
            },
        });
        res.status(201).json(transfer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error requesting transfer', error });
    }
};
exports.requestTransfer = requestTransfer;
const getTransfers = async (req, res) => {
    try {
        // Branch managers see requests involving their branch. Admins see all.
        const { role, branchId } = req.user;
        let query = {};
        if (role === 'BRANCH_MANAGER' && branchId) {
            query = {
                OR: [
                    { fromBranchId: branchId },
                    { toBranchId: branchId },
                ],
            };
        }
        const transfers = await prisma_1.default.transferRequest.findMany({
            where: query,
            include: { asset: true, fromBranch: true, toBranch: true },
        });
        res.json(transfers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching transfers', error });
    }
};
exports.getTransfers = getTransfers;
const updateTransferStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body; // APPROVED, REJECTED
        const userId = req.user?.id;
        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const transfer = await prisma_1.default.transferRequest.findUnique({ where: { id: Number(id) } });
        if (!transfer)
            return res.status(404).json({ message: 'Transfer request not found' });
        // Only Admin can approve? Or To-Branch Manager? Requirement says "with approval workflow". Usually Head Office approves.
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Only admins can approve transfers' });
        }
        const updatedTransfer = await prisma_1.default.transferRequest.update({
            where: { id: Number(id) },
            data: {
                status,
                remarks,
                approvedDate: status === 'APPROVED' ? new Date() : null,
            },
        });
        const actionDetails = remarks ? `Transfer ${status.toLowerCase()}. Remarks: ${remarks}` : `Transfer ${status.toLowerCase()}`;
        if (status === 'APPROVED') {
            // Update Asset Branch
            await prisma_1.default.asset.update({
                where: { id: transfer.assetId },
                data: { branchId: transfer.toBranchId },
            });
            await prisma_1.default.assetHistory.create({
                data: {
                    assetId: transfer.assetId,
                    action: 'TRANSFERRED',
                    userId,
                    details: `${actionDetails}. Moved from ${transfer.fromBranchId} to ${transfer.toBranchId}`,
                },
            });
        }
        else {
            await prisma_1.default.assetHistory.create({
                data: {
                    assetId: transfer.assetId,
                    action: 'TRANSFER_REJECTED',
                    userId,
                    details: actionDetails,
                },
            });
        }
        res.json(updatedTransfer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating transfer', error });
    }
};
exports.updateTransferStatus = updateTransferStatus;
