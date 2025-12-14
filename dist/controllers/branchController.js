"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.updateBranch = exports.getBranchById = exports.getAllBranches = exports.createBranch = void 0;
const zod_1 = require("zod");
const prisma_1 = __importDefault(require("../utils/prisma"));
const branchSchema = zod_1.z.object({
    name: zod_1.z.string(),
    location: zod_1.z.string(),
});
const createBranch = async (req, res) => {
    try {
        const { name, location } = branchSchema.parse(req.body);
        const branch = await prisma_1.default.branch.create({
            data: { name, location },
        });
        res.status(201).json(branch);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating branch', error });
    }
};
exports.createBranch = createBranch;
const getAllBranches = async (req, res) => {
    try {
        const branches = await prisma_1.default.branch.findMany({
            include: {
                _count: {
                    select: { users: true, assets: true }
                }
            }
        });
        res.json(branches);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching branches', error });
    }
};
exports.getAllBranches = getAllBranches;
const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await prisma_1.default.branch.findUnique({
            where: { id: Number(id) },
        });
        if (!branch)
            return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching branch', error });
    }
};
exports.getBranchById = getBranchById;
const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = branchSchema.parse(req.body);
        const branch = await prisma_1.default.branch.update({
            where: { id: Number(id) },
            data: { name, location },
        });
        res.json(branch);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating branch', error });
    }
};
exports.updateBranch = updateBranch;
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.branch.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Branch deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting branch', error });
    }
};
exports.deleteBranch = deleteBranch;
