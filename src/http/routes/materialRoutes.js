import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';

const router = Router();

router.get('/', MaterialController.findAll);

export default router;