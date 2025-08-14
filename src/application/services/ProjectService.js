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
    }, autor){

        const projectSaved = await ProjectRepository.save({
        title,
        autor,
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
}

export default ProjectService;