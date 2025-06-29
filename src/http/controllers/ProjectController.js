import ProjectService from "../../application/services/ProjectService.js";

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
}

export default ProjectController;