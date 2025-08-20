import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';
import FavoriteController from '../controllers/FavoriteController.js';
const router = Router();

router.get('/', MaterialController.findAll);
router.post('/', MaterialController.save);
router.get('/me', MaterialController.findByUser);
router.post('/favorites', FavoriteController.save)
router.get('/:id', MaterialController.getById);

export default router;