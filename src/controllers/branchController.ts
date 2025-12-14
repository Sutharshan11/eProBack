import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../utils/prisma';

const branchSchema = z.object({
    name: z.string(),
    location: z.string(),
});

export const createBranch = async (req: Request, res: Response) => {
    try {
        const { name, location } = branchSchema.parse(req.body);
        const branch = await prisma.branch.create({
            data: { name, location },
        });
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Error creating branch', error });
    }
};

export const getAllBranches = async (req: Request, res: Response) => {
    try {
        const branches = await prisma.branch.findMany({
            include: {
                _count: {
                    select: { users: true, assets: true }
                }
            }
        });
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching branches', error });
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const branch = await prisma.branch.findUnique({
            where: { id: Number(id) },
        });
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching branch', error });
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, location } = branchSchema.parse(req.body);

        const branch = await prisma.branch.update({
            where: { id: Number(id) },
            data: { name, location },
        });

        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Error updating branch', error });
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.branch.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting branch', error });
    }
};
