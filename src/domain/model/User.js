import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

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
    methods: {
        comparePassword(password) {
            return bcrypt.compareSync(password, this.password)
        }
    }
},{
    timestamps: true
});

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next;

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export default model('User', userSchema);