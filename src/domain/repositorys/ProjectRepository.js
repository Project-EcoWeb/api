import Project from "../model/Project.js";

class ProjectRepository{
    static async findAll(){
        return await Project.find().populate({ path: 'autor', select: '-password'});
    }

    static async save(data){
        return await Project.create(data);
    }

    static async findThreeLast() {
        return await Project.find().sort({ date: -1}).limit(3);
    }

    static async findByUser(userId) {
        return await Project.find({ author: userId });
    }
}

export default ProjectRepository;