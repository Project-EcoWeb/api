import { Router } from 'express';
import ProjectController from "../controllers/ProjectController.js";
import FavoriteController from "../controllers/FavoriteController.js";
import checkTypeFavorite from '../middlewares/checkTypeFavorite.js';
const router = Router();

router.get('/favorites', checkTypeFavorite, FavoriteController.getAllByUser);

router.get('/count-projects', ProjectController.countProjectsByUser);
router.get('/count-favorites', ProjectController.countFavoritesByUser);

export default router;