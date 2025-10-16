import mongoose from 'mongoose';

export const companies = [
    {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        name: 'Constrular Materiais de Construção',
        cnpj: '12.345.678/0001-95',
        phone: '(11) 3456-7890',
        location: 'Rua das Construções, 123 - Centro, São Paulo - SP',
        cep: '01234-567',
        email: 'contato@constrular.com.br',
        responsibleName: 'Carlos Silva',
        logo: 'https://exemplo.com/logos/constrular-logo.jpg',
        password: 'Senha123@' 
    },
    {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
        name: 'Ferreira & Cia Ferragens',
        cnpj: '98.765.432/0001-10',
        phone: '(11) 98765-4321',
        location: 'Av. das Ferragens, 456 - Industrial, São Paulo - SP',
        cep: '04567-890',
        email: 'vendas@ferreiraecia.com.br',
        responsibleName: 'Ana Ferreira',
        logo: 'https://exemplo.com/logos/ferreira-logo.jpg',
        password: 'Senha123@'
    }
];