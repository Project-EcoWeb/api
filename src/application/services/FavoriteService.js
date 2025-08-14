import FavoriteRepository from '../../domain/repositorys/FavoriteRepository.js';
import UserValidator from '../validations/UserValidator.js';
import AppError from '../../shared/error/AppError.js';

class FavoriteService {
    static async save(data) {
        await FavoriteRepository.save(data);
    }
    static async getAllByUser(data) {
        if (!data.type) {
            return await FavoriteRepository.findAll();
        }

        return await FavoriteRepository.findAll(data.type);
    }
    static async countFavoritesByUser(userId) {
        if (!(await UserValidator.isExists(userId))) {
            throw new AppError('User not exists', 409);
        }

        return await FavoriteRepository.countFavoritesByUser(userId);
    }
}

export default FavoriteService;