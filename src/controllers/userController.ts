import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Using bcryptjs as per project
import prisma from '../utils/prisma';
import { sendInvitationEmail } from '../utils/email';
import { z } from 'zod';

const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER', 'STAFF']),
    branchId: z.number().optional(),
});

const updateRoleSchema = z.object({
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER', 'STAFF']),
});

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
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
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const data = createUserSchema.parse(req.body);

        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
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
            await sendInvitationEmail(data.email, data.name, data.password, data.role);
        } catch (emailError) {
            console.error("Failed to send invitation email:", emailError);
        }

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const updateUserRole = async (req: any, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const { role } = updateRoleSchema.parse(req.body);

        // Check authorization - only SUPER_ADMIN and ADMIN can change roles
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to change user roles' });
        }

        // Get the target user
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent changing own role
        if (targetUser.id === req.user?.id) {
            return res.status(400).json({ message: 'Cannot change your own role' });
        }

        // Update user role
        const updatedUser = await prisma.user.update({
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
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error });
    }
};

export const deleteUser = async (req: any, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        // Check authorization - only SUPER_ADMIN and ADMIN can delete users
        if (req.user?.role !== 'SUPER_ADMIN' && req.user?.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Unauthorized to delete users' });
        }

        // Get the target user
        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent self-deletion
        if (targetUser.id === req.user?.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        // Delete user
        await prisma.user.delete({
            where: { id: userId },
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
