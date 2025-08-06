import UserRespository from "../../domain/repositorys/UserRespository.js";
import AppError from "../../shared/error/AppError.js";
import jwt from 'jsonwebtoken';
import authConfig from '../../shared/config/auth.js';

class AuthService{
    static async register({ name, email, password}){

        if(!name || !email || !password){
            return new AppError('fields incompleted', 400);
        }

        if(await UserRespository.findByEmail({ email })){
            return new AppError('user exists', 404);
        }

        await UserRespository.save({ name, email, password});
    }
    static async login(data){

        const user = await UserRespository.findByEmail(data);

        if(!user){
            console.log(user);
            return new AppError('user not exists', 404);
        }

        const userVerified = await UserRespository.findByEmailAndComparePassword(data);
        
        if(!userVerified){
            return new AppError('password incorrect', 400);
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