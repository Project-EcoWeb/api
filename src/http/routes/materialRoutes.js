import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';
import FavoriteController from '../controllers/FavoriteController.js';
import authentication from '../middlewares/auth.js';
const router = Router();

router.get('/', MaterialController.findAll);
router.post('/', authentication, MaterialController.save);
router.get('/me', authentication, MaterialController.findByUser);
router.get('/me/:id', authentication, MaterialController.getMineById);
router.post('/favorites', authentication, FavoriteController.save);
router.get('/search', authentication, MaterialController.findByNameOrStatus);
router.get('/:id', MaterialController.getById);
router.patch('/:id/update-status', authentication, MaterialController.updateStatus);
router.delete('/:id', authentication, MaterialController.delete);
router.patch('/:id', authentication, MaterialController.update);

export default router;
