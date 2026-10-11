import UserRepository from '../../domain/repositories/UserRespository.js';
import UserValidator from '../validations/UserValidator.js';
import AppError from '../../shared/error/AppError.js';
import ProjectRepository from "../../domain/repositories/ProjectRepository.js";
import { isValidObjectId } from 'mongoose';
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

    static async findById(id) {
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

    static async findPublicById(id) {
        if (!isValidObjectId(id)) throw new AppError('user not found', 404);
        const user = await UserRepository.findById(id);
        if (!user) throw new AppError('user not found', 404);

        const projects = await ProjectRepository.findByUser(id);
        return {
            user: {
                id: user.id,
                name: user.name,
                numberProjects: projects.length,
                projects
            }
        };
    }
}
export default UserService;
