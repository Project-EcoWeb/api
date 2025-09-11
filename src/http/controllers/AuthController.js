import { response } from "express";
import AuthService from "../../application/services/AuthService.js";

class AuthController {
    static async login(req, res){
        try {

            if (req.query.q === 'company') {
                const { emailOrCnpj, password } = req.body;
                const token = await AuthService.loginCompany({ emailOrCnpj, password });
                return res.json(token);
            }
            
            const { email, password} = req.body;
            const data = await AuthService.login({ email, password });
            return res.json(data);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }

    static async register(req, res){
        const data = req.body;
        try{
            await AuthService.register(data);
            res.status(201);
            return res.end();
        }catch(error){
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
}

export default AuthController;