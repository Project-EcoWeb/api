import Project from "../model/Project.js";

class ProjectRepository{
    static async findAll(){
        return await Project.find();
    }
}

export default ProjectRepository;