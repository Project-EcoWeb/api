import Company from '../model/Company.js';

class CompanyRepository {
    static async create(data) {
        await Company.create(data);
    }
    static async findById(id) {
        return await Company.findById(id);
    }
    static async findByEmailOrCnpj() {

        if (arguments.length === 1) {
            return await Company.findOne({
                $or: [{
                    email: arguments[0]
                }, {
                    cnpj: arguments[0]
                }]
            });
        }

        if (arguments.length === 2) {
            return await Company.find({
                $or: [{
                    email: arguments[0]
                }, {
                    cnpj: arguments[1]
                }]
            })
        }
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