import User from '../model/User.js';

class UserRespository{
    static async save(data){
        return await User.create(data);
    }
    static async findByEmail({ email }){
        return await User.findOne({ where: { email }});
    }
    static async findByEmailAndComparePassword({ email, password }){
        return await User.findOne({ where: { email, password}})
    }
}

export default UserRespository;