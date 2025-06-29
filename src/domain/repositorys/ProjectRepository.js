import Project from "../model/Project.js";

class ProjectRepository{
    static async findAll(){
        return await Project.find().populate({ path: 'autor', select: '-password'});
    }

    static async save(data){
        return await Project.create(data);
    }
}

export default ProjectRepository;