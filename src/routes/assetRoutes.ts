import { Router } from 'express';
import { createAsset, getAssets, updateAssetStatus } from '../controllers/assetController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Only Admins/Branch Managers can add assets (depending on requirements, let's say Admin adds, Branch Manager views locally?)
// Requirement: "Branch Office-In-Charge: Add new asset entries... cannot edit/delete directly"
router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), createAsset);
router.get('/', authenticateToken, getAssets);
router.put('/:id/status', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), updateAssetStatus);

export default router;
