import { Router } from 'express';
import CompanyController from "../controllers/CompanyController.js";
import authentication from '../middlewares/auth.js';


const router = Router();

router.patch('/', authentication, CompanyController.update);
router.get('/me/profile', authentication, CompanyController.getMeProfile);
router.get('/:id/profile', CompanyController.getProfile);

export default router;
