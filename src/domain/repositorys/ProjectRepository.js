import Project from "../model/Project.js";

class ProjectRepository{
    static async findAll(){
        return await Project.find().populate({ path: 'user', select: '-password'});
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

    static async countProjectsByUser(userId) {
        return await Project.countDocuments({ user: userId });
    }

    static async findById(id) {
        return await Project.findById(id).populate({ path: 'user', select: '-password' });
    }
}

export default ProjectRepository;