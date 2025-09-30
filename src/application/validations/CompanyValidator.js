import CompanyRepository from '../../domain/repositorys/CompanyRepository.js';

class CompanyValidator {
    static async isExists(id) {
        return !(await CompanyRepository.findById(id)) ? false : true;
    }
    static async isExistsByEmailOrCnpj({ emailOrCnpj, email, cnpj }) {
        if (!email && !cnpj) {
            return !(await CompanyRepository.findByEmailOrCnpj(emailOrCnpj)) ? false : true;
        } else {
            return !(await CompanyRepository.findByEmailOrCnpj(email, cnpj)) ? false : true;
        }
    }
    static async isExistsByName(name) {
        return !(await CompanyRepository.findByEmail(name)) ? false : true;
    }
}

export default CompanyValidator;