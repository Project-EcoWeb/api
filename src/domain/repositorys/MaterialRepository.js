import { populate } from 'dotenv';
import Material from '../model/Material.js';

class MaterialRepository{
    static async findAll(){
        return await Material.find(),populate({ path: 'autor', select: '-password'});
    }
}

export default MaterialRepository;