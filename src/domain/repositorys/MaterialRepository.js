import { populate } from 'dotenv';
import Material from '../model/Material.js';

class MaterialRepository{
    static async findAll(){
        return await Material.find().populate({ path: 'author', select: '-password'});
    }
    static async save(data){
        return await Material.create(data);
    }
}

export default MaterialRepository;