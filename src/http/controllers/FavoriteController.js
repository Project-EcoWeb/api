import FavoriteService from '../../application/services/FavoriteService.js'

class FavoriteController {
    static async save(req, res) {
        try {
            req.body.user = req.userId;
            await FavoriteService.save(req.body);
            res.end();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    static async getAllByUser(req, res) {
        try {
            const type = req.query.type;
            const user = req.userId;
            const data = await FavoriteService.getAllByUser({ type, user });
            return res.json(data);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export default FavoriteController;