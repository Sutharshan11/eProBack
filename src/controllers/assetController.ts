import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';

const assetSchema = z.object({
    assetId: z.string(),
    name: z.string(),
    category: z.string(),
    status: z.enum(['Active', 'Damaged', 'Disposed', 'InTransit']).default('Active'),
    value: z.number(),
    branchId: z.number(),
});

export const createAsset = async (req: AuthRequest, res: Response) => {
    try {
        const data = assetSchema.parse(req.body);

        // Check if asset ID exists
        const existing = await prisma.asset.findUnique({ where: { assetId: data.assetId } });
        if (existing) return res.status(400).json({ message: 'Asset ID already exists' });

        const asset = await prisma.asset.create({
            data: {
                ...data,
            },
        });

        // Log history
        await prisma.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'CREATED',
                userId: req.user?.id,
                details: 'Initial creation',
            },
        });

        res.status(201).json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset', error });
    }
};

export const getAssets = async (req: Request, res: Response) => {
    try {
        const { branchId } = req.query;
        const query = branchId ? { branchId: Number(branchId) } : {};
        const assets = await prisma.asset.findMany({
            where: query,
            include: { branch: true },
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
