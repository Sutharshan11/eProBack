"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assetController_1 = require("../controllers/assetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Only Admins/Branch Managers can add assets (depending on requirements, let's say Admin adds, Branch Manager views locally?)
// Requirement: "Branch Office-In-Charge: Add new asset entries... cannot edit/delete directly"
router.post('/', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), assetController_1.createAsset);
router.get('/', authMiddleware_1.authenticateToken, assetController_1.getAssets);
router.put('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), assetController_1.updateAsset);
router.put('/:id/status', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), assetController_1.updateAssetStatus);
router.delete('/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), assetController_1.deleteAsset);
router.get('/next-code', authMiddleware_1.authenticateToken, assetController_1.getNextAssetCode);
router.patch('/:id/restore', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), assetController_1.restoreAsset);
router.get('/:id/history', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(['SUPER_ADMIN', 'ADMIN']), assetController_1.getAssetHistory);
router.get('/master-data', authMiddleware_1.authenticateToken, assetController_1.getBoardOfSurveyMasterData);
exports.default = router;
