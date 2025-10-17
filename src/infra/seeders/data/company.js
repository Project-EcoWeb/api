import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

async function encodePassword(hash) {
    return await bcrypt.hash(hash, 8);
}

export const companies = [
    {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        name: 'Constrular Materiais de Construção',
        cnpj: '13.896.592/0001-13',
        phone: '95991203454',
        location: 'Rua das Construções, 123 - Centro, São Paulo - SP',
        cep: '55028-334',
        email: 'contato@constrular.com.br',
        responsibleName: 'Carlos Silva',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvcG-gn02rCni4P8Y3vTvjsI7UTg0jq3D1w&s',
        password: encodePassword('admin'),
        isVerified: false
    },
    {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
        name: 'Ferreira & Cia Ferragens',
        cnpj: '08.042.316/0001-58',
        phone: '95991325614',
        location: 'Av. das Ferragens, 456 - Industrial, São Paulo - SP',
        cep: '55028-334',
        email: 'vendas@ferreiraecia.com.br',
        responsibleName: 'Ana Ferreira',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb64fuklslXVsWZiBEobDTWCTKgZh-NBUOOA&s',
        password: encodePassword('Senha123@'),
        isVerified: true
    },
    {
        _id: new mongoose.Types.ObjectId('661f1f77bcf86cd799439013'),
        name: 'Prefeitura de Boa Vista',
        cnpj: '95.378.438/0001-14',
        phone: '95992893421',
        location: 'Rua General Penha Brasil, nº 1011, bairro São Francisco',
        cep: '69305130',
        email: 'prefeitura@gmail.com',
        responsibleName: 'Arthur Henrique Brandão Machado.',
        logo: 'https://assets-pmbv.s3.sa-east-1.amazonaws.com/logo_pmbv.png',
        password: encodePassword('admin'),
        isVerified: true
    }
];