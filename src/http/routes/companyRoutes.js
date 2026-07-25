import { Router } from 'express';
import CompanyController from "../controllers/CompanyController.js";


const router = Router();

router.patch('/', CompanyController.update);
router.get('/me/profile', CompanyController.getMeProfile);
router.get('/:id/profile', CompanyController.getProfile);

export default router;
