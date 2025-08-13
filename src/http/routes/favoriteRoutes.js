import { Router } from 'express';
import FavoriteController from "../controllers/FavoriteController.js";

const router = Router();

router.get('/', FavoriteController.getAllByUser);

export default router;