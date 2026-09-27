import MaterialRepository from "../../domain/repositories/MaterialRepository.js";
import ProjectRepository from "../../domain/repositories/ProjectRepository.js";
import AppError from "../../shared/error/AppError.js";

class SearchService{
    static async getByText(query) {

        if (!query) {
            return {
                message: 'result not foun with this text'
            }; 
        }

        if (typeof query !== 'string' || query.length > 100) {
            throw new AppError('query must be a string with at most 100 characters', 400);
        }

        const literal = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const projects = await ProjectRepository.findAllByContainsText(literal);
        const materials = await MaterialRepository.findAllByContainsText(literal);

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
