import ProjectRepository from '../../domain/repositorys/ProjectRepository.js';

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
}

export default ProjectService;