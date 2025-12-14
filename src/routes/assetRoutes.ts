import { Router } from 'express';
import { createAsset, getAssets, updateAssetStatus, updateAsset, deleteAsset, getNextAssetCode, restoreAsset, getAssetHistory, getBoardOfSurveyMasterData } from '../controllers/assetController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

// Only Admins/Branch Managers can add assets (depending on requirements, let's say Admin adds, Branch Manager views locally?)
// Requirement: "Branch Office-In-Charge: Add new asset entries... cannot edit/delete directly"
router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), createAsset);
router.get('/', authenticateToken, getAssets);
router.put('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), updateAsset);
router.put('/:id/status', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), updateAssetStatus);
router.delete('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER']), deleteAsset);
router.get('/next-code', authenticateToken, getNextAssetCode);
router.patch('/:id/restore', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), restoreAsset);
router.get('/:id/history', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), getAssetHistory);
router.get('/master-data', authenticateToken, getBoardOfSurveyMasterData);

export default router;
