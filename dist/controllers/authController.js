"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const email_1 = require("../utils/email");
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string(),
    role: zod_1.z.enum(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']),
    branchId: zod_1.z.number().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
const resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    newPassword: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const register = async (req, res) => {
    try {
        const { email, password, name, role, branchId } = registerSchema.parse(req.body);
        const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
                branchId,
            },
        });
        res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role, branchId: user.branchId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, branchId: user.branchId } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);
        const userId = req.user?.id; // From auth middleware
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Get user from database
        const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Verify old password
        const isMatch = await bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }
        // Hash new password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update password in database
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        res.json({ message: 'Password changed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.changePassword = changePassword;
const forgotPassword = async (req, res) => {
    try {
        const { email } = forgotPasswordSchema.parse(req.body);
        // Find user by email
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        // Always return success message (security best practice - don't reveal if email exists)
        if (!user) {
            res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
            return;
        }
        // Generate secure random token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        // Set expiry to 1 hour from now
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        // Save token and expiry to database
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });
        // Send password reset email
        await (0, email_1.sendPasswordResetEmail)(user.email, user.name, resetToken);
        res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = resetPasswordSchema.parse(req.body);
        // Find user by reset token
        const user = await prisma_1.default.user.findFirst({
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
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        // Update password and clear reset token
        await prisma_1.default.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        res.json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.resetPassword = resetPassword;
