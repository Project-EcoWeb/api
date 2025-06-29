import ProjectService from "../../application/services/ProjectService.js";

class ProjectController{
    static async findAll(req, res){
        const data = await ProjectService.findAll();
        return res.json(data);
    }
}

export default ProjectController;