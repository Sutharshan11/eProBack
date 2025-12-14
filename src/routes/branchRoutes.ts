import { Router } from 'express';
import { createBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from '../controllers/branchController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN']), createBranch);
router.get('/', authenticateToken, getAllBranches);
router.get('/:id', authenticateToken, getBranchById);
router.put('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN']), updateBranch);
router.delete('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN']), deleteBranch);

export default router;
