import CompanyRepository from '../../domain/repositorys/CompanyRepository.js';

class CompanyValidator {
    static async isExists(id) {
        return !(await CompanyRepository.findById(id)) ? false : true;
    }
    static async isExistsByEmailOrCnpj(emailOrCnpj) {
        return !(await CompanyRepository.findByEmailOrCnpj(emailOrCnpj)) ? false : true;
    }
}

export default CompanyValidator;