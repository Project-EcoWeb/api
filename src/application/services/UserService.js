import UserRepository from '../../domain/repositorys/UserRespository.js';
import UserValidator from '../validations/UserValidator.js';
import AppError from '../../shared/error/AppError.js';
import ProjectRepository from "../../domain/repositorys/ProjectRepository.js";
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

    static async findById(id, user) {
        if (!(await UserValidator.isExists(id))) {
            throw new AppError('user not found', 404);
        }

        const userSaved = await UserRepository.findById(id);
        const projects = await ProjectRepository.findByUser(id);

        return {
            user: {
                id: userSaved.id,
                name: userSaved.name,
                email: userSaved.email,
                numberProjects: projects.length,
                projects
            }
        }
    }
}
export default UserService;