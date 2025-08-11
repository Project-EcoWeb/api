import { Router } from 'express';

const router = Router();

router.get('/favorites', async (req, res) => {
    return res.json({ isActive: true, favorites: [] });
})

export default router;