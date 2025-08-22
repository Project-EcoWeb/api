import { Router } from 'express';

import SearchController from '../controllers/SearchController.js';4
const router = Router();

router.get('/', SearchController.getByText);

export default router;