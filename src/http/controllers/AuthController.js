import { response } from "express";
import AuthService from "../../application/services/AuthService.js";

class AuthController {
    static async login(req, res){
        const { email, password} = req.body;
        try{
            const data = await AuthService.login({ email, password });
            return res.json(data);
        }catch(error){
            logger.info(error);
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
            logger.info(error);
            return res.status(error.statusCode || 500).json({ message: error.message});
        }
    }
}

export default AuthController;