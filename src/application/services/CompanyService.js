import CompanyRepository from '../../domain/repositorys/CompanyRepository.js';
import CompanyValidator from '../validations/CompanyValidator.js';
import MaterialService from './MaterialService.js';

class CompanyService{
    static async getProfileById(id) {
        if (!(await CompanyValidator.isExists(id))) {
            throw new AppError('User not exists', 404);
        }

        const company = await CompanyRepository.findById(id);
        const materials = await MaterialService.findByUser(id);

        return {
            ...company.toObject(),
            materials
        };  
    }
}

export default CompanyService;