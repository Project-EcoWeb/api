import User from '../model/User.js';

class UserRespository{
    static async save(data){
        await User.create(data);
    }
    static async findByEmail(email){
        return await User.findOne( { email });
    }
    static async findByEmailAndComparePassword({ email, password }){
        const user = await User.findOne({ email }).select('+password');
        return user.comparePassword(password) ? {
                id: user.id,
                email: user.email,
                name: user.name
            } : false;
    }
    static async findById(id) {
        return await User.findById(id);
    }
    static async update({ id, user }) {
        await User.findByIdAndUpdate(id, user, { runValidators: true });
    }
}

export default UserRespository;