import Company from '../model/Company.js';

class CompanyRepository {
    static async findById(id) {
        return await Company.findById(id);
    }
    static async findByEmailOrCnpj(emailOrCnpj) {
        return await Company.findOne({
            $or: [{
                email: emailOrCnpj
            }, {
                cnpj: emailOrCnpj
            }]
        });
    }
    static async findOneAndComparePassword({ emailOrCnpj, password }) {
        const company = await Company.findOne({
            $or: [{
                email: emailOrCnpj
            }, {
                cnpj: emailOrCnpj
            }]
        }).select('+password');
        
        return company.comparePassword(password) ? {
                id: company.id,
                name: company.name,
                logo: company.logo
            } : false;
    }
}

export default CompanyRepository;