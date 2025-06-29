import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";

class MaterialService{
    static async findAll(){
        const materials = await MaterialRepository.findAll();
        return materials;
    }
}

export default MaterialService;