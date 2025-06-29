import { Router } from 'express';
import MaterialController from '../controllers/MaterialController.js';

const router = Router();

router.get('/', MaterialController.findAll);
router.post('/', MaterialController.save);
export default router;