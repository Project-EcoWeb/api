import { Router } from 'express';
import ProjectController from '../controllers/ProjectController.js';

const router = Router();

router.get('/', ProjectController.findAll);
router.post('/', ProjectController.save);

export default router;