import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import crypto from 'crypto';
import prisma from '../utils/prisma';
import { sendPasswordResetEmail } from '../utils/email';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']),
    branchId: z.number().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name, role, branchId } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
                branchId,
            },
        });

        res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, branchId: user.branchId },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, branchId: user.branchId } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const changePassword = async (req: any, res: Response): Promise<void> => {
    try {
        const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);
        const userId = req.user?.id; // From auth middleware

        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Get user from database
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = forgotPasswordSchema.parse(req.body);

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        // Always return success message (security best practice - don't reveal if email exists)
        if (!user) {
            res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
            return;
        }

        // Generate secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Set expiry to 1 hour from now
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Save token and expiry to database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Send password reset email
        await sendPasswordResetEmail(user.email, user.name, resetToken);

        res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token, newPassword } = resetPasswordSchema.parse(req.body);

        // Find user by reset token
        const user = await prisma.user.findFirst({
            where: { resetToken: token },
        });

        if (!user) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }

        // Check if token has expired
        if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
            res.status(400).json({ message: 'Reset token has expired' });
            return;
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
