import { Router } from 'express';
import FavoriteController from "../controllers/FavoriteController.js";
import checkTypeFavorite from "../middlewares/checkTypeFavorite.js";

const router = Router();

router.get('/', checkTypeFavorite, FavoriteController.getAllByUser);

export default router;