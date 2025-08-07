import MaterialService from "../../application/services/MaterialService.js";
import ProjectService from "../../application/services/ProjectService.js";
import logger from "../../infra/logger/logger.js";

class HomeController{
    static async home(req, res) {
        try {
            const lastThreeProjects = await ProjectService.findThreeLast();
            const lastThreeMaterials = await MaterialService.findLastThree();
            return res.json({
                projects: lastThreeProjects,
                materials: lastThreeMaterials
            });
        } catch (error) {
            logger.info(error);
            return res.status(error.statusCode || 500).json({ message: error.meessage });
        }
    }
}

export default HomeController;