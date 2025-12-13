import { Router } from 'express';
import { getUsers, createUser, updateUserRole, deleteUser } from '../controllers/userController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), getUsers);
router.post('/', authenticateToken, authorizeRole(['SUPER_ADMIN']), createUser);
router.put('/:id/role', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), updateUserRole);
router.delete('/:id', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), deleteUser);

export default router;
