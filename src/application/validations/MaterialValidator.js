import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";

class MaterialValidator {
    static async isExists(id) {
        return !MaterialRepository.findById(id) ? false: true;
    }
    static async checkUser({ id, user }) {
        const { company: userSaved } = MaterialRepository.findById(id);

        return userSaved.id === user ? true : false;
    }
}

export default MaterialValidator;