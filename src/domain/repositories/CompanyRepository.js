import Company from '../model/Company.js';
import bcrypt from "bcryptjs";

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
            }).exec();
        }

        if (arguments.length === 2) {
            return await Company.findOne({
                $or: [{
                    email: arguments[0]
                }, {
                    cnpj: arguments[1]
                }]
            }).exec();
        }
    }
    static async findOneAndComparePassword({ emailOrCnpj, password }) {
        const {_doc: company} = await Company.findOne({
            $or: [{
                email: emailOrCnpj
            }, {
                cnpj: emailOrCnpj
            }]
        }).select('+password').exec();;
        
        if (!this.comparePassword(password, company.password)) return null;

        return company;
    }
    static async findByEmail(email) {
        return await Company.findOne({ email });
    }
    static async findByCnpj(cnpj) {
        return await Company.findOne({ cnpj });
    }
    static async findByName(name) {
        return await Company.findOne({ name });
    }
    static comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}

export default CompanyRepository;