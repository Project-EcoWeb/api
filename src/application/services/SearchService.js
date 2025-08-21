import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";
import ProjectRepository from "../../domain/repositorys/ProjectRepository.js";
import AppError from "../../shared/error/AppError.js";

class SearchService{
    static async getByText(query) {
        const projects = await ProjectRepository.findAllByContainsText(query);
        const materials = await MaterialRepository.findAllByContainsText(query);
    }
}

export default SearchService;