import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name is required'],
        unique: true
    },
    cnpj: {
        type: String,
        trim: true,
        required: [true, 'cnpj is required'],
        match: [/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/, 'cnpj format invalid'],
        unique: true
    },
    phone: {
        type: String,
        match: [/^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/, 'phone in format invalid'],
        required: [true, 'phone is required'],

    },
    location: {
        type: String,
        required: [true, 'Endereço é obrigatório']
    },
    cep: {
        type: String,
        required: [true, 'cep is required'],
        trim: true,
        match: [ /^\d{5}-?\d{3}$/, 'cep in format invalid']
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'email in format invalid'],
        required: [true, 'email is required']
    },
    responsibleName: String,
    logo: String,
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
        select: false
    }
});

companySchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;

    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

companySchema.method('comparePassword', async function (password) {
    return bcrypt.compare(password, this.password);
});

export default model('Company', companySchema);