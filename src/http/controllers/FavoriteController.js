import FavoriteService from '../../application/services/FavoriteService.js'
import logger from "../../infra/logger/logger.js";

class FavoriteController {
    static async save(req, res) {
        try {
            res.json({ isActive: true });
            await FavoriteService.save(req.body);
        } catch (error) {
            logger.info(error);
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    static async getAllByUser(req, res) {
        
    }
}

export default FavoriteController;