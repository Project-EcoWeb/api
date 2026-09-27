import { Router } from 'express';
import FeedbackController from "../controllers/FeedbackController.js";
import authentication from '../middlewares/auth.js';

const router = Router();

router.post('/', authentication, FeedbackController.save);


export default router;
