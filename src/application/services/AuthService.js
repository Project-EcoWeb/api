import UserRespository from "../../domain/repositorys/UserRespository.js";
import AppError from "../../shared/error/AppError.js";
import jwt from 'jsonwebtoken';
import authConfig from '../../shared/config/auth.js';

class AuthService{
    static async register(data){

        if(!(await UserRespository.findByEmail(data))){
            return new AppError('user exists', 400);
        }
        const user = await UserRespository.save(data);
        
        return user;
    }
    static async login(data){
        const user = await UserRespository.findByEmail(data);

        if(!user){
            return new AppError('user not exists', 400);
        }

        const userVerified = await UserRespository.findByEmailAndComparePassword(data);
        
        if(!userVerified){
            return new AppError('password incorrect', 400);
        }

        const { id, name }= user;

         return {
            user: {id,name,email},
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
         }
    }
}

export default AuthService;