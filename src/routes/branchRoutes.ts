import { Router } from 'express';
import { createBranch, getAllBranches, getBranchById } from '../controllers/branchController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN']), createBranch);
router.get('/', authenticateToken, getAllBranches);
router.get('/:id', authenticateToken, getBranchById);

export default router;
