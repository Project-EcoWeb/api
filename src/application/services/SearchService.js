import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";
import ProjectRepository from "../../domain/repositorys/ProjectRepository.js";
import AppError from "../../shared/error/AppError.js";

class SearchService{
    static async getByText(query) {

        if (!query) {
            return {
                message: 'result not foun with this text'
            }; 
        }

        const projects = await ProjectRepository.findAllByContainsText(query);
        const materials = await MaterialRepository.findAllByContainsText(query);

        return {
            query: query,
            results: {
                projects,
                materials
            },
            meta: {
                numberProjects: projects.length,
                numberMaterials: materials.length,
                total: projects.length + materials.length
            }
        };
    }
}

export default SearchService;