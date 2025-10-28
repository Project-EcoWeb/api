import { Router } from 'express';
import CompanyController from "../controllers/CompanyController.js";


const router = Router();

router.get('/me/profile', CompanyController.getMeProfile);
router.get('/:id/profile', CompanyController.getProfile);

export default router; 