import CompanyService from "../../application/services/CompanyService.js";

class CompanyController{
    static async getMeProfile(req, res) {
        try {
            const user = req.userId;
            const data = await CompanyService.getProfileById(user);
            return res.json(data);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    static async getProfile(req, res) {
        try {
            const { id } = req.params;
            const data = await CompanyService.getProfileById(id);
            return res.json(data);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export default CompanyController;