import UserRepository from '../../domain/repositorys/UserRespository.js';
import UserValidator from '../validations/UserValidator.js';
import AppError from '../../shared/error/AppError.js';
class UserService{
    static async find() {
        
    }

    static async update({ id, user}) {
        if (!(await UserValidator.isExists(id))) {
            throw new AppError('user not found', 404);
        }

        if (!user) {
            throw new AppError('body is invalid', 400);
        }

        await UserRepository.update({ id, user });
    }
}
export default UserService;