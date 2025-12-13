import { Router } from 'express';
import { requestTransfer, getTransfers, updateTransferStatus } from '../controllers/transferController';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, requestTransfer);
router.get('/', authenticateToken, getTransfers);
router.put('/:id/status', authenticateToken, authorizeRole(['SUPER_ADMIN', 'ADMIN']), updateTransferStatus);

export default router;
