import { populate } from 'dotenv';
import Material from '../model/Material.js';

class MaterialRepository{
    static async findAll(){
        return await Material.find().populate({ path: 'user', select: '-password'});
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
    static async findById(id) {
        return await Material.findById(id).populate({ path: 'user', select: '-password' });
    }
}

export default MaterialRepository;