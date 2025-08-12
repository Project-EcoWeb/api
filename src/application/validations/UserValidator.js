import UserRepository from '../../domain/repositorys/UserRespository.js'

class UserValidator{
    static async isExists(id) {
        return !(await UserRepository.findById(id)) ? false : true;
    }
    static async isExistsByEmail(email) {
        return !(await UserRepository.findByEmail(email)) ? false : true;
    }
}

export default UserValidator;