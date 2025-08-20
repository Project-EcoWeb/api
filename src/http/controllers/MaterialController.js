import MaterialService from "../../application/services/MaterialService.js";
import logger from '../../infra/logger/logger.js';

class MaterialController{
    static async findAll(req, res){
        try{
            const data = await MaterialService.findAll();
            return res.json(data);
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
    static async save(req, res){
        const body = req.body;
        try{
            const data = await MaterialService.save(body, req.userId);
            return res.json(data);
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
    static async findByUser(req, res) {
        try {
            const materials = await MaterialService.findByUser(req.userId);
            return res.json(materials);
        } catch (error) {
            logger.info(error);
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const material = await MaterialService.getById({ id: req.params.id, user: req.userId });
            return res.json(material);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export default MaterialController;