"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = exports.sendInvitationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter object using the default SMTP transport
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password, not main password
    },
});
const sendInvitationEmail = async (email, name, password, role) => {
    try {
        const info = await transporter.sendMail({
            from: `"ProAsset System" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Welcome to ProAsset Management System", // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #4f46e5; text-align: center;">Welcome to ProAsset</h2>
                    <p>Dear ${name},</p>
                    <p>You have been invited to join the <strong>ProAsset Management System</strong> as a <strong>${role}</strong>.</p>
                    <p>Here are your temporary login credentials:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Username:</strong> ${email}</p>
                        <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
                    </div>
                    <p>Please login and change your password immediately.</p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:5173/login" style="background-color: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Dashboard</a>
                    </div>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #6b7280; font-size: 12px; text-align: center;">This is an automated message. Please do not reply.</p>
                </div>
            `,
        });
        console.log("Message sent: %s", info.messageId);
        return true;
    }
    catch (error) {
        console.error("Error sending email: ", error);
        return false;
    }
};
exports.sendInvitationEmail = sendInvitationEmail;
const sendPasswordResetEmail = async (email, name, resetToken) => {
    try {
        const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
        const info = await transporter.sendMail({
            from: `"GJRTI eAsset System" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password - GJRTI eAsset",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <h2 style="color: #4f46e5; text-align: center;">Password Reset Request</h2>
                    <p>Dear ${name},</p>
                    <p>We received a request to reset your password for your <strong>GJRTI eAsset Management System</strong> account.</p>
                    <p>Click the button below to reset your password. This link will expire in <strong>1 hour</strong>.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #4f46e5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
                    </div>
                    <p style="color: #6b7280; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #4f46e5; font-size: 12px;">${resetLink}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                    <p style="color: #ef4444; font-size: 13px;"><strong>Security Notice:</strong> If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
                    <p style="color: #6b7280; font-size: 12px; text-align: center;">This is an automated message. Please do not reply.</p>
                </div>
            `,
        });
        console.log("Password reset email sent: %s", info.messageId);
        return true;
    }
    catch (error) {
        console.error("Error sending password reset email: ", error);
        return false;
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
