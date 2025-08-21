import AppError from "../../shared/error/AppError";
import SearchService from '../../application/services/SearchService.js';


class SearchController{
    static async getByText(req, res) {
        try {
            const listResult = await SearchService.getByText(req.query.query);
            return res.json(listResult);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    } 
}

export default SearchController;