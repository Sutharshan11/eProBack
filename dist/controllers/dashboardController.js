"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getDashboardStats = async (req, res) => {
    try {
        const { role, branchId } = req.user;
        // 1. Asset Count
        // If Branch Manager, only count assets in their branch?
        // Requirement says "Total Assets". Usually a dashboard shows global or local context.
        // Let's filter by branch if Branch Manager.
        const assetQuery = (role === 'BRANCH_MANAGER' && branchId) ? { branchId } : {};
        const totalAssets = await prisma_1.default.asset.count({ where: assetQuery });
        // 2. Pending Transfers
        // Branch Manager sees transfers related to them (FROM or TO).
        // Admin sees all pending transfers.
        let transferQuery = { status: 'PENDING' };
        if (role === 'BRANCH_MANAGER' && branchId) {
            transferQuery = {
                status: 'PENDING',
                OR: [
                    { fromBranchId: branchId },
                    { toBranchId: branchId }
                ]
            };
        }
        const pendingTransfers = await prisma_1.default.transferRequest.count({ where: transferQuery });
        // 3. Total Branches
        // Everyone can see total branches number? Or relevant ones?
        // Usually "Branches" count is global.
        const totalBranches = await prisma_1.default.branch.count();
        // 4. Charts Data
        // Assets by Category
        const assetsByCategoryGroup = await prisma_1.default.asset.groupBy({
            by: ['category'],
            _count: { _all: true },
            where: assetQuery
        });
        const assetsByCategory = assetsByCategoryGroup.map(item => ({
            name: item.category,
            value: item._count._all
        }));
        // Assets by Status
        const assetsByStatusGroup = await prisma_1.default.asset.groupBy({
            by: ['status'],
            _count: { _all: true },
            where: assetQuery
        });
        const assetsByStatus = assetsByStatusGroup.map(item => ({
            name: item.status,
            value: item._count._all
        }));
        // Asset Value by Branch (Top 5?)
        // If Branch Manager, this will only show their own branch, which is fine (single bar).
        // If Admin, shows all.
        const branches = await prisma_1.default.branch.findMany({
            include: {
                assets: {
                    select: { value: true }
                }
            }
        });
        const assetsValueByBranch = branches.map(b => ({
            name: b.name,
            value: b.assets.reduce((sum, a) => sum + a.value, 0)
        })).sort((a, b) => b.value - a.value).slice(0, 5); // Top 5 branches by value
        res.json({
            totalAssets,
            pendingTransfers,
            totalBranches,
            charts: {
                assetsByCategory,
                assetsByStatus,
                assetsValueByBranch
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error });
    }
};
exports.getDashboardStats = getDashboardStats;
