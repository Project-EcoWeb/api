import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import checkFields from "../middlewares/checkFields.js";

const router = Router();

router.post('/login', checkFields, AuthController.login);
router.post('/register', AuthController.register);

export default router ;