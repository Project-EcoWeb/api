import { populate } from 'dotenv';
import Material from '../model/Material.js';

class MaterialRepository{
    static async findAll(){
        return await Material.find().populate({ path: 'author', select: '-password'});
    }
    static async save(data){
        return await Material.create(data);
    }
    static async findThreeLast() {
        return await Material.find().sort({ date: -1 }).limit(3);
    }
    static async findByUser(userId) {
        return await Material.find({ author: userId });
    }
}

export default MaterialRepository;