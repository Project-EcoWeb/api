import { Router } from 'express';
import FeedbackController from "../controllers/FavoriteController.js";

const router = Router();

router.post('/ ', FeedbackController.save);


export default router;