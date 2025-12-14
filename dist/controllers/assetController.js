"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoardOfSurveyMasterData = exports.getAssetHistory = exports.restoreAsset = exports.deleteAsset = exports.updateAsset = exports.updateAssetStatus = exports.getAssets = exports.createAsset = exports.getNextAssetCode = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const assetSchema = zod_1.z.object({
    assetId: zod_1.z.string(),
    name: zod_1.z.string(),
    category: zod_1.z.string().nullable().optional(),
    status: zod_1.z.enum(['Active', 'Damaged', 'Disposed', 'In Use', 'InTransit']).default('Active'),
    value: zod_1.z.number().optional(),
    branchId: zod_1.z.number(),
    // New Fields
    inventoryPageNo: zod_1.z.string().nullable().optional(),
    purchaseDate: zod_1.z.string().or(zod_1.z.date()).nullable().optional().transform(val => val ? new Date(val) : undefined),
    purchasePrice: zod_1.z.number().nullable().optional(),
    grnNumber: zod_1.z.string().nullable().optional(),
    remarks: zod_1.z.string().nullable().optional(),
    revaluationPrice: zod_1.z.number().nullable().optional(),
    transferredToConsumable: zod_1.z.boolean().optional(),
    currentLocation: zod_1.z.string().nullable().optional(),
    newSection: zod_1.z.string().nullable().optional(), // Maps to currentSectionId potentially, or just text? Assuming text for now or ID
    // Relations
    sectionId: zod_1.z.number().nullable().optional(),
    centerId: zod_1.z.number().nullable().optional(),
    assetTypeId: zod_1.z.number().nullable().optional(),
    boardOfSurveyCategoryId: zod_1.z.number().nullable().optional(),
    boardOfSurveyYearId: zod_1.z.number().nullable().optional(),
});
const getPrefix = (category) => {
    const map = {
        'Furniture': 'FUR',
        'Computer': 'COM',
        'Accessory': 'ACC',
        'Vehicle': 'VEH',
        'Jewellery Equipment': 'JEW',
        'Lab Equipment': 'LAB',
    };
    return map[category] || 'GEN';
};
const getNextAssetCode = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category || typeof category !== 'string') {
            return res.status(400).json({ message: 'Category is required' });
        }
        const prefix = getPrefix(category);
        // Find assets starting with this prefix
        const assets = await prisma_1.default.asset.findMany({
            where: {
                assetId: {
                    startsWith: prefix
                }
            },
            select: { assetId: true }
        });
        // Extract numbers and find max
        let maxNum = 0;
        assets.forEach(a => {
            const parts = a.assetId.split('/');
            if (parts.length === 2) {
                const num = parseInt(parts[1], 10);
                if (!isNaN(num) && num > maxNum)
                    maxNum = num;
            }
        });
        const nextNum = maxNum + 1;
        const nextCode = `${prefix}/${nextNum.toString().padStart(3, '0')}`;
        res.json({ nextCode });
    }
    catch (error) {
        console.error('Error generating code:', error);
        res.status(500).json({ message: 'Error generating asset code' });
    }
};
exports.getNextAssetCode = getNextAssetCode;
const createAsset = async (req, res) => {
    try {
        const data = assetSchema.parse(req.body);
        // Check if asset ID exists
        const existing = await prisma_1.default.asset.findUnique({ where: { assetId: data.assetId } });
        if (existing)
            return res.status(400).json({ message: 'Asset ID already exists' });
        const asset = await prisma_1.default.asset.create({
            data: {
                assetId: data.assetId,
                name: data.name,
                category: data.category,
                status: data.status,
                value: data.value || 0,
                branchId: data.branchId,
                inventoryPageNo: data.inventoryPageNo,
                purchaseDate: data.purchaseDate,
                purchasePrice: data.purchasePrice,
                grnNumber: data.grnNumber,
                remarks: data.remarks,
                revaluationPrice: data.revaluationPrice,
                transferredToConsumable: data.transferredToConsumable || false,
                currentLocation: data.currentLocation,
                sectionId: data.sectionId,
                centerId: data.centerId,
                assetTypeId: data.assetTypeId,
                boardOfSurveyCategoryId: data.boardOfSurveyCategoryId,
                boardOfSurveyYearId: data.boardOfSurveyYearId,
            },
        });
        // Log history
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'CREATED',
                userId: req.user?.id,
                details: 'Initial creation with full details',
            },
        });
        res.status(201).json(asset);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating asset', error });
    }
};
exports.createAsset = createAsset;
const getAssets = async (req, res) => {
    try {
        const { branchId } = req.query;
        const query = branchId ? { branchId: Number(branchId) } : {};
        const assets = await prisma_1.default.asset.findMany({
            where: query,
            include: {
                branch: true,
                center: true,
                section: true,
                assetType: true,
                boardOfSurveyCategory: true,
                boardOfSurveyYear: true,
            },
        });
        res.json(assets);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching assets', error });
    }
};
exports.getAssets = getAssets;
const updateAssetStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, details } = req.body; // Status: Active, Damaged, Disposed
        const asset = await prisma_1.default.asset.update({
            where: { id: Number(id) },
            data: { status },
        });
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'UPDATED', // Or DISPOSED if status is disposed
                userId: req.user?.id,
                details: `Status changed to ${status}. ${details || ''}`,
            },
        });
        res.json(asset);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating asset', error });
    }
};
exports.updateAssetStatus = updateAssetStatus;
const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        // Use partial schema for updates
        const data = assetSchema.partial().parse(req.body);
        // Prevent updating critical IDs if they somehow sneak in, though schema validation should handle types
        // Zod partial() makes everything optional.
        // Exclude newSection as it is not in the Prisma model and causes Unknown Argument error
        const { newSection, ...updateData } = data;
        const asset = await prisma_1.default.asset.update({
            where: { id: Number(id) },
            data: {
                ...updateData,
                // Ensure dates are parsed if they come as strings, though Zod transform might handle it
                purchaseDate: data.purchaseDate,
            },
        });
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'UPDATED',
                userId: req.user?.id,
                details: 'Asset details updated via edit form',
            },
        });
        res.json(asset);
    }
    catch (error) {
        console.error('Update Asset Error:', error);
        res.status(500).json({ message: 'Error updating asset', error });
    }
};
exports.updateAsset = updateAsset;
const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        console.log(`Disposing asset ${id} with reason: ${reason}`);
        const asset = await prisma_1.default.asset.update({
            where: { id: Number(id) },
            data: { status: 'Disposed' },
        });
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'DISPOSED',
                userId: req.user?.id,
                details: reason || 'Asset disposed via delete action',
            },
        });
        res.json({ message: 'Asset disposed successfully', asset });
    }
    catch (error) {
        console.error('Delete Asset Error:', error);
        res.status(500).json({ message: 'Error disposing asset', error });
    }
};
exports.deleteAsset = deleteAsset;
const restoreAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await prisma_1.default.asset.update({
            where: { id: Number(id) },
            data: { status: 'Active' },
        });
        await prisma_1.default.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'RESTORED',
                userId: req.user?.id,
                details: 'Asset restored from Recycle Bin',
            },
        });
        res.json({ message: 'Asset restored successfully', asset });
    }
    catch (error) {
        console.error('Restore Asset Error:', error);
        res.status(500).json({ message: 'Error restoring asset', error });
    }
};
exports.restoreAsset = restoreAsset;
const getAssetHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await prisma_1.default.assetHistory.findMany({
            where: { assetId: Number(id) },
            orderBy: { createdAt: 'desc' },
            include: {
                asset: { select: { name: true, assetId: true } },
            }
        });
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
};
exports.getAssetHistory = getAssetHistory;
const getBoardOfSurveyMasterData = async (req, res) => {
    try {
        const categories = await prisma_1.default.boardOfSurveyCategory.findMany();
        const years = await prisma_1.default.boardOfSurveyYear.findMany({ orderBy: { year: 'desc' } });
        res.json({ categories, years });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching master data', error });
    }
};
exports.getBoardOfSurveyMasterData = getBoardOfSurveyMasterData;
