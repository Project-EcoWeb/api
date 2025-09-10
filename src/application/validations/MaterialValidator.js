import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";

class MaterialValidator {
    static async isExists(id) {
        return !MaterialRepository.findById(id) ? false: true;
    }
    static async checkUser({ id, user }) {
        const { user: userSaved } = MaterialRepository.findById(id);

        return user === userSaved ? true : false;
    }
}

export default MaterialValidator;