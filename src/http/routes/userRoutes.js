import { Router } from 'express';
import ProjectController from "../controllers/ProjectController.js";
import FavoriteController from "../controllers/FavoriteController.js";
import checkTypeFavorite from '../middlewares/checkTypeFavorite.js';
import UserController from "../controllers/UserController.js";
import authentication from '../middlewares/auth.js';
const router = Router();

router.get('/favorites', authentication, checkTypeFavorite, FavoriteController.getAllByUser);

router.get('/count-projects', authentication, ProjectController.countProjectsByUser);
router.get('/count-favorites', authentication, ProjectController.countFavoritesByUser);
router.patch('/', authentication, UserController.update);
router.get('/me/profile', authentication, UserController.getMeProfile);
router.get('/:id/profile', UserController.getProfile);

export default router;
