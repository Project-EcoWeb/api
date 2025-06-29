import MaterialService from "../../application/services/MaterialService.js";

class MaterialController{
    static async findAll(req, res){
        try{
            const data = await MaterialService.findAll();
            return res.json(data);
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
}

export default MaterialController;