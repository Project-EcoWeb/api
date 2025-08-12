import UserRespository from "../../domain/repositorys/UserRespository.js";
import AppError from "../../shared/error/AppError.js";
import jwt from 'jsonwebtoken';
import authConfig from '../../shared/config/auth.js';
import UserValidator from "../validations/UserValidator.js";

class AuthService{
    static async register({ name, email, password}){

        if(!name || !email || !password){
            throw new AppError('fields incompleted', 400);
        }

        if (await UserValidator.isExistsByEmail(email)) {
            throw new AppError('user with this email already registered', 409);
        }

        await UserRespository.save({ name, email, password});
    }
    static async login(data){

        const user = await UserRespository.findByEmail(data.email);

        if(!user){
            throw new AppError('user not exists', 404);
        }

        const userVerified = await UserRespository.findByEmailAndComparePassword(data);
        
        if(!userVerified){
            throw new AppError('password incorrect', 400);
        }

        const { id, name, email}= user;

         return {
            user: {id,name,email},
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
         }
    }
}

export default AuthService;