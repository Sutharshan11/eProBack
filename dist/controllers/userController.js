"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.createUser = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Using bcryptjs as per project
const prisma_1 = __importDefault(require("../utils/prisma"));
const email_1 = require("../utils/email");
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
    role: zod_1.z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER', 'STAFF']),
    branchId: zod_1.z.number().optional(),
});
const updateRoleSchema = zod_1.z.object({
    role: zod_1.z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER', 'STAFF']),
});
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                branch: {
                    select: { name: true }
                },
                createdAt: true
            }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const data = createUserSchema.parse(req.body);
        const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
        if (existing)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
        const { password, ...userWithoutPassword } = user;
        // Send Invitation Email
        // Note: In production, might want to do this asynchronously or handle failure gracefully
        // For now, we log errors but don't fail the request if email fails
        try {
            await (0, email_1.sendInvitationEmail)(data.email, data.name, data.password, data.role);
        }
        catch (emailError) {
            console.error("Failed to send invitation email:", emailError);
        }
        res.status(201).json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
exports.createUser = createUser;
const updateUserRole = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { role } = updateRoleSchema.parse(req.body);
        // Check authorization - only SUPER_ADMIN and ADMIN can change roles
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to change user roles' });
        }
        // Get the target user
        const targetUser = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Prevent changing own role
        if (targetUser.id === req.user?.id) {
            return res.status(400).json({ message: 'Cannot change your own role' });
        }
        // Update user role
        const updatedUser = await prisma_1.default.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                branch: {
                    select: { name: true }
                },
                createdAt: true
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user role', error });
    }
};
exports.updateUserRole = updateUserRole;
const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        // Check authorization - only SUPER_ADMIN and ADMIN can delete users
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to delete users' });
        }
        // Get the target user
        const targetUser = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Prevent self-deletion
        if (targetUser.id === req.user?.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }
        // Delete user
        await prisma_1.default.user.delete({
            where: { id: userId },
        });
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
exports.deleteUser = deleteUser;
