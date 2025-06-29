import Material from '../model/Material.js';

class MaterialRepository{
    static async findAll(){
        return await Material.find();
    }
}

export default MaterialRepository;