import AuthService from "../../application/services/AuthService.js";

class AuthController {

    static async login(req, res){
        const { email, password} = req.body;
        try{
            const data = await AuthService.login({ email, password });
            return req.json(data);
        }catch(error){
            return res.statusCode(error.statusCode || 500).json({ message: error.message});
        }
    }

    static async register(req, res){
        const data = req.body;
    }
}

export default AuthController;