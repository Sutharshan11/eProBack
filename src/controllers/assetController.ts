import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';


const assetSchema = z.object({
    assetId: z.string(),
    name: z.string(),
    category: z.string().nullable().optional(),
    status: z.enum(['Active', 'Damaged', 'Disposed', 'In Use', 'InTransit']).default('Active'),
    value: z.number().optional(),
    branchId: z.number(),

    // New Fields
    inventoryPageNo: z.string().nullable().optional(),
    purchaseDate: z.string().or(z.date()).nullable().optional().transform(val => val ? new Date(val) : undefined),
    purchasePrice: z.number().nullable().optional(),
    grnNumber: z.string().nullable().optional(),
    remarks: z.string().nullable().optional(),
    revaluationPrice: z.number().nullable().optional(),
    transferredToConsumable: z.boolean().optional(),
    currentLocation: z.string().nullable().optional(),
    newSection: z.string().nullable().optional(), // Maps to currentSectionId potentially, or just text? Assuming text for now or ID

    // Relations
    sectionId: z.number().nullable().optional(),
    centerId: z.number().nullable().optional(),
    assetTypeId: z.number().nullable().optional(),
    boardOfSurveyCategoryId: z.number().nullable().optional(),
    boardOfSurveyYearId: z.number().nullable().optional(),
});

const getPrefix = (category: string) => {
    const map: Record<string, string> = {
        'Furniture': 'FUR',
        'Computer': 'COM',
        'Accessory': 'ACC',
        'Vehicle': 'VEH',
        'Jewellery Equipment': 'JEW',
        'Lab Equipment': 'LAB',
    };
    return map[category] || 'GEN';
};

export const getNextAssetCode = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        if (!category || typeof category !== 'string') {
            return res.status(400).json({ message: 'Category is required' });
        }

        const prefix = getPrefix(category);

        // Find assets starting with this prefix
        const assets = await prisma.asset.findMany({
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
                if (!isNaN(num) && num > maxNum) maxNum = num;
            }
        });

        const nextNum = maxNum + 1;
        const nextCode = `${prefix}/${nextNum.toString().padStart(3, '0')}`;

        res.json({ nextCode });
    } catch (error) {
        console.error('Error generating code:', error);
        res.status(500).json({ message: 'Error generating asset code' });
    }
};

export const createAsset = async (req: AuthRequest, res: Response) => {
    try {
        const data = assetSchema.parse(req.body);

        // Check if asset ID exists
        const existing = await prisma.asset.findUnique({ where: { assetId: data.assetId } });
        if (existing) return res.status(400).json({ message: 'Asset ID already exists' });

        const asset = await prisma.asset.create({
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
        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'CREATED',
                userId: req.user?.id,
                details: 'Initial creation with full details',
            },
        });

        res.status(201).json(asset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating asset', error });
    }
};

export const getAssets = async (req: Request, res: Response) => {
    try {
        const { branchId } = req.query;
        const query = branchId ? { branchId: Number(branchId) } : {};
        const assets = await prisma.asset.findMany({
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
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets', error });
    }
};

export const updateAssetStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status, details } = req.body; // Status: Active, Damaged, Disposed

        const asset = await prisma.asset.update({
            where: { id: Number(id) },
            data: { status },
        });

        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'UPDATED', // Or DISPOSED if status is disposed
                userId: req.user?.id,
                details: `Status changed to ${status}. ${details || ''}`,
            },
        });

        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Error updating asset', error });
    }
};

export const updateAsset = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        // Use partial schema for updates
        const data = assetSchema.partial().parse(req.body);

        // Prevent updating critical IDs if they somehow sneak in, though schema validation should handle types
        // Zod partial() makes everything optional.

        // Exclude newSection as it is not in the Prisma model and causes Unknown Argument error
        const { newSection, ...updateData } = data;

        const asset = await prisma.asset.update({
            where: { id: Number(id) },
            data: {
                ...updateData,
                // Ensure dates are parsed if they come as strings, though Zod transform might handle it
                purchaseDate: data.purchaseDate,
            },
        });

        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'UPDATED',
                userId: req.user?.id,
                details: 'Asset details updated via edit form',
            },
        });

        res.json(asset);
    } catch (error) {
        console.error('Update Asset Error:', error);
        res.status(500).json({ message: 'Error updating asset', error });
    }
};

export const deleteAsset = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        console.log(`Disposing asset ${id} with reason: ${reason}`);

        const asset = await prisma.asset.update({
            where: { id: Number(id) },
            data: { status: 'Disposed' },
        });

        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'DISPOSED',
                userId: req.user?.id,
                details: reason || 'Asset disposed via delete action',
            },
        });

        res.json({ message: 'Asset disposed successfully', asset });
    } catch (error) {
        console.error('Delete Asset Error:', error);
        res.status(500).json({ message: 'Error disposing asset', error });
    }
};

export const restoreAsset = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;

        const asset = await prisma.asset.update({
            where: { id: Number(id) },
            data: { status: 'Active' },
        });

        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'RESTORED',
                userId: req.user?.id,
                details: 'Asset restored from Recycle Bin',
            },
        });

        res.json({ message: 'Asset restored successfully', asset });
    } catch (error) {
        console.error('Restore Asset Error:', error);
        res.status(500).json({ message: 'Error restoring asset', error });
    }
};

export const getAssetHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const history = await prisma.assetHistory.findMany({
            where: { assetId: Number(id) },
            orderBy: { createdAt: 'desc' },
            include: {
                asset: { select: { name: true, assetId: true } },
            }
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error });
    }
};

export const getBoardOfSurveyMasterData = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.boardOfSurveyCategory.findMany();
        const years = await prisma.boardOfSurveyYear.findMany({ orderBy: { year: 'desc' } });
        res.json({ categories, years });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching master data', error });
    }
};
