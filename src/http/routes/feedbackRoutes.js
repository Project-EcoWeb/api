import { Router } from 'express';
import FeedbackController from "../controllers/FeedbackController.js";

const router = Router();

router.post('/', FeedbackController.save);


export default router;
