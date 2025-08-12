import { Router } from 'express';
import ProjectController from '../controllers/ProjectController.js';
import FavoriteController from "../controllers/FavoriteController.js";

const router = Router();

router.get('/', ProjectController.findAll);
router.post('/', ProjectController.save);
router.get('/me', ProjectController.findByUser);
router.post('/favorites', FavoriteController.save);

export default router;