import User from '../model/User.js';

class UserRespository{
    static async save(data){
        return await User.create(data);
    }
    static async findByEmail({ email }){
        return await User.findOne( { email });
    }
    static async findByEmailAndComparePassword({ email, password }){
        return await User.findOne({ email, password});
    }
}

export default UserRespository;