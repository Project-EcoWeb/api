import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";

class MaterialService{
    static async findAll(){
        const materials = await MaterialRepository.findAll();
        return materials;
    }
    static async save({ 
        name,
        image,
        description,
        location,
        quantity,
        category
    }, author){

        const data = await MaterialRepository.save({
            name,
            image,
            description,
            location,
            quantity,
            category,
            author
        })

        return data;
    }
}

export default MaterialService;