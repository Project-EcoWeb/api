import UserService from "../../application/services/UserService.js";

class UserController{
    static async find() {
        
    }

    static async update(req, res) {
        try {
            const { name, email } = req.body;
    
            const user = await UserService.update({
                id: req.userId,
                user: { name, email }
            });

            return res.status(204).end();

        } catch (error) {
            return res.status(error.statuCode || 500).json({ message: error.message });
        }
    }

    static async getMeProfile(req, res) {
        try {
            
            const user = req.userId;
            const data = await UserService.findById(user);
            return res.json(data);

        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });   
        }
    }

    static async getProfile(req, res) {
        try {
            const { id } = req.params;
            const data = await UserService.findById(id);
            return res.json(data);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export default UserController;