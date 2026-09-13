import User from '../model/User.js';
import { compareSync } from "bcryptjs";

class UserRespository{
    static async save(data){
        await User.create(data);
    }
    static async findByEmail(email){
        return await User.findOne( { email });
    }
    static async findByEmailAndComparePassword({ email, password }){
        const {_doc: user} = await User.findOne({ email }).select("+password").exec();

        if(!this.comparePassword(password, user.password)) return null

        return user;
    }
    static async findById(id) {
        return await User.findById(id);
    }
    static async update({ id, user }) {
        await User.findByIdAndUpdate(id, user, { runValidators: true });
    }

    static comparePassword(password, hash) {
         return compareSync(password, hash);
    }
}

export default UserRespository;