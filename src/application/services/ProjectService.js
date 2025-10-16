import ProjectRepository from '../../domain/repositorys/ProjectRepository.js';
import AppError from '../../shared/error/AppError.js';
import UserValidator from '../validations/UserValidator.js';

class ProjectService{
    static async findAll(){
        const projects = await ProjectRepository.findAll();
        return projects;
    }

    static async save({
        title,
        date,
        image,
        description,
        materials,
        stages,
        video,
        category,
        difficulty
    }, user){

        const projectSaved = await ProjectRepository.save({
        title,
        user,
        date,
        image,
        description,
        materials,
        stages,
        video,
        category,
        difficulty
        });

        return projectSaved;
    }

    static async findThreeLast() {
        const lastThreeProjects = await ProjectRepository.findThreeLast();
        return lastThreeProjects;
    }

    static async findByUser(userId) {

        if (!(await UserValidator.isExists(userId))) {
            throw new AppError('User not exists', 409);
        }

        const projects = await ProjectRepository.findByUser(userId);
        return projects;
    }

    static async countProjectsByUser(userId) {
        
        if (!(await UserValidator.isExists(userId))) {
            throw new AppError('User not exists', 409);
        }

        const numberProjects = await ProjectRepository.countProjectsByUser(userId);
        return numberProjects;
    }

    static async getById({ id, user }) {

        const project = await ProjectRepository.findById(id);

        if (!project) {
            throw new AppError('project not found', 404);
        }

        return project;
    }
}

export default ProjectService;