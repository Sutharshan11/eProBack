import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';

const transferSchema = z.object({
    assetId: z.number(),
    toBranchId: z.number(),
    reason: z.string().optional(),
});

export const requestTransfer = async (req: AuthRequest, res: Response) => {
    try {
        const { assetId, toBranchId, reason } = transferSchema.parse(req.body);
        const userId = req.user?.id;

        // Check if asset exists and belongs to user's branch (or admin override)
        const asset = await prisma.asset.findUnique({ where: { id: assetId } });
        if (!asset) return res.status(404).json({ message: 'Asset not found' });

        // Validate permission: Branch Manager can only transfer FROM their branch
        if (req.user?.role === 'BRANCH_MANAGER' && asset.branchId !== req.user.branchId) {
            return res.status(403).json({ message: 'You can only transfer assets from your own branch' });
        }

        const transfer = await prisma.transferRequest.create({
            data: {
                assetId,
                fromBranchId: asset.branchId,
                toBranchId,
                status: 'PENDING',
                reason,
            },
        });

        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'TRANSFER_REQUESTED',
                userId,
                details: `Requested transfer to branch ${toBranchId}`,
            },
        });

        res.status(201).json(transfer);
    } catch (error) {
        res.status(500).json({ message: 'Error requesting transfer', error });
    }
};

export const getTransfers = async (req: AuthRequest, res: Response) => {
    try {
        // Branch managers see requests involving their branch. Admins see all.
        const { role, branchId } = req.user!;
        let query = {};
        if (role === 'BRANCH_MANAGER' && branchId) {
            query = {
                OR: [
                    { fromBranchId: branchId },
                    { toBranchId: branchId },
                ],
            };
        }

        const transfers = await prisma.transferRequest.findMany({
            where: query,
            include: { asset: true, fromBranch: true, toBranch: true },
        });
        res.json(transfers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transfers', error });
    }
};

export const updateTransferStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body; // APPROVED, REJECTED
        const userId = req.user?.id;

        if (!['APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const transfer = await prisma.transferRequest.findUnique({ where: { id: Number(id) } });
        if (!transfer) return res.status(404).json({ message: 'Transfer request not found' });

        // Only Admin can approve? Or To-Branch Manager? Requirement says "with approval workflow". Usually Head Office approves.
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Only admins can approve transfers' });
        }

        const updatedTransfer = await prisma.transferRequest.update({
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
            await prisma.asset.update({
                where: { id: transfer.assetId },
                data: { branchId: transfer.toBranchId },
            });

            await prisma.assetHistory.create({
                data: {
                    assetId: transfer.assetId,
                    action: 'TRANSFERRED',
                    userId,
                    details: `${actionDetails}. Moved from ${transfer.fromBranchId} to ${transfer.toBranchId}`,
                },
            });
        } else {
            await prisma.assetHistory.create({
                data: {
                    assetId: transfer.assetId,
                    action: 'TRANSFER_REJECTED',
                    userId,
                    details: actionDetails,
                },
            });
        }

        res.json(updatedTransfer);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transfer', error });
    }
};
