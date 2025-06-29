import ProjectRepository from '../../domain/repositorys/ProjectRepository.js';

class ProjectService{
    static async findAll(){
        const projects = await ProjectRepository.findAll();
        return projects;
    }
}

export default ProjectService;