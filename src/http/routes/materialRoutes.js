import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';
import FavoriteController from '../controllers/FavoriteController.js';
const router = Router();

router.get('/', MaterialController.findAll);
router.post('/', MaterialController.save);
router.get('/me', MaterialController.findByUser);
router.post('/favorites', FavoriteController.save)
router.get('/:id', MaterialController.getById);
router.patch('/:id/update-status', MaterialController.updateStatus);
router.delete('/:id', MaterialController.delete);
router.patch('/:id', MaterialController.update);

export default router;