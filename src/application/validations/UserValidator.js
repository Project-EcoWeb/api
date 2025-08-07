import UserRepository from '../../domain/repositorys/UserRespository.js'

class UserValidator{
    static async isExists(id) {
        return !(await UserRepository.findById(id)) ? false : true;
    }
}

export default UserValidator;