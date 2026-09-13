import CompanyRepository from '../../domain/repositories/CompanyRepository.js';
import CompanyValidator from '../validations/CompanyValidator.js';
import MaterialService from './MaterialService.js';
import AppError from "../../shared/error/AppError.js";

class CompanyService{
    static async update({ id, company }) {
        try {
            if (!(await CompanyValidator.isExists(id))) {
                throw new AppError('company not found', 404);
            }

            if (!company || typeof company !== 'object') {
                throw new AppError('body is invalid', 400);
            }

            const allowedFields = [
                'name',
                'cnpj',
                'phone',
                'location',
                'cep',
                'email',
                'responsibleName',
                'logo'
            ];
            const changes = Object.fromEntries(
                allowedFields
                    .filter((field) => company[field] !== undefined)
                    .map((field) => [field, company[field]])
            );

            if (Object.keys(changes).length === 0) {
                throw new AppError('body is invalid', 400);
            }

            const currentCompany = await CompanyRepository.findById(id);
            if (!currentCompany) {
                throw new AppError('company not found', 404);
            }
            await this.ensureUniqueFields({ id, currentCompany, changes });

            await CompanyRepository.update({ id, company: changes });
        } catch (error) {
            throw this.mapPersistenceError(error);
        }
    }

    static async ensureUniqueFields({ id, currentCompany, changes }) {
        const uniqueFields = [
            ['name', 'findByName'],
            ['email', 'findByEmail'],
            ['cnpj', 'findByCnpj']
        ];

        for (const [field, repositoryMethod] of uniqueFields) {
            if (changes[field] === undefined || changes[field] === currentCompany[field]) {
                continue;
            }

            const companyWithSameValue = await CompanyRepository[repositoryMethod](changes[field]);
            if (companyWithSameValue && companyWithSameValue.id !== id && companyWithSameValue._id?.toString() !== id) {
                throw new AppError(`company with this ${field} already registered`, 409);
            }
        }
    }

    static mapPersistenceError(error) {
        if (error?.statusCode) {
            return error;
        }

        if (error?.code === 11000) {
            return new AppError('company with this value already registered', 409);
        }

        if (error?.name === 'ValidationError' || error?.name === 'CastError') {
            return new AppError(error.message, 400);
        }

        return error;
    }

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
