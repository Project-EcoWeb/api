import UserRespository from "../../domain/repositorys/UserRespository.js";
import AppError from "../../shared/error/AppError.js";
import jwt from 'jsonwebtoken';
import authConfig from '../../shared/config/auth.js';
import UserValidator from "../validations/UserValidator.js";
import CompanyValidator from "../validations/CompanyValidator.js";
import CompanyRepository from "../../domain/repositorys/CompanyRepository.js";

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

        if(!(await UserValidator.isExistsByEmail(data.email))){
            throw new AppError('user not exists or email incorrect', 404);
        }

        const user = await UserRespository.findByEmailAndComparePassword({ email: data.email, password: data.password});
        
        if (!user){
            throw new AppError('password incorrect', 400);
        }

        const { id, name, email } = user;
        return {
            user: {id,name,email},
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        }
    }
    static async loginCompany(data) {
        
        if (!(await CompanyValidator.isExistsByEmailOrCnpj({emailOrCnpj: data.emailOrCnpj}))) {
            throw new AppError('company not exists or, email or cnpj incorrect', 404);
        }

        const company = await CompanyRepository.findOneAndComparePassword({ emailOrCnpj: data.emailOrCnpj, password: data.password });

        if (!company) {
            throw new AppError('password incorrect', 400);
        }

        const { id, name, logo } = company;

        return {
            company: { id, name, logo },
            token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn })
        };
    }
    static async registerCompany({ name, location, cnpj, phone, cep, email, responsibleName, logo, password }) {
        
        if (await CompanyValidator.isExistsByName(name)) {
            throw new AppError('company with name is registred', 403);
        }
        
        if (await CompanyValidator.isExistsByEmailOrCnpj({ email, cnpj })) {
            throw new AppError('email or cnpj is registred', 403);
        }


        await CompanyRepository.create({
            name,
            location,
            cnpj,
            phone,
            cep,
            email,
            responsibleName,
            logo,
            password
        });
    }
}

export default AuthService;