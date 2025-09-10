import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";

class MaterialValidator {
    static async isExists(id) {
        return !(await MaterialRepository.findById(id)) ? false : true;
    }
}

export default MaterialValidator;