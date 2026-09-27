import { Router } from 'express';
import ProjectController from '../controllers/ProjectController.js';
import FavoriteController from "../controllers/FavoriteController.js";
import authentication from '../middlewares/auth.js';

const router = Router();

router.get('/', ProjectController.findAll);
router.post('/', authentication, ProjectController.save);
router.get('/me', authentication, ProjectController.findByUser);
router.post('/favorites', authentication, FavoriteController.save);
router.get('/:id', ProjectController.getById);

export default router;
