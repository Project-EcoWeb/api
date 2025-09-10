import {Schema, model} from 'mongoose';
import bcrypt, { compare } from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'please, use valid email']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next;

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.method('comparePassword', async function (password) {
    return compare(password, this.password);
});

export default model('User', userSchema);