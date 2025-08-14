import { Router } from 'express';
import ProjectController from "../controllers/ProjectController.js";

const router = Router();

router.get('/favorites', async (req, res) => {
    return res.json({ isActive: true, favorites: [] });
})

router.get('/count-projects', ProjectController.countProjectsByUser);
router.get('/count-favorites', ProjectController.countFavoritesByUser);

export default router;