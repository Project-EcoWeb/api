import ProjectService from "../../application/services/ProjectService.js";
import logger from '../../infra/logger/logger.js';

class ProjectController{
    static async findAll(req, res){
        try{
            const data = await ProjectService.findAll();
            return res.json(data);
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
    static async save(req, res){
        const body = req.body;
        try{
            const data = await ProjectService.save(body, req.userId);
            return res.json(data);
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
    static async findByUser(req, res) {
        try {
            const projects = await ProjectService.findByUser(req.userId);
            return res.json(projects);
        } catch (error) {
            logger.info(error);
            return res.status(error.status || 500).json({ message: error.message });
        }
    }
}

export default ProjectController;