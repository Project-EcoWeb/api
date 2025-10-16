import MaterialRepository from "../../domain/repositorys/MaterialRepository.js";
import AppError from '../../shared/error/AppError.js';
import MaterialValidator from "../validations/MaterialValidator.js";
import CompanyValidator from "../validations/CompanyValidator.js";

class MaterialService{
    static async findAll(){
        const materials = await MaterialRepository.findAll();
        return materials;
    }
    static async save({ 
        name,
        image,
        description,
        location,
        quantity,
        category,
        unitOfMeasure,
        instructions
    }, user){

        await MaterialRepository.save({
            name,
            image,
            description,
            location,
            quantity,
            category,
            unitOfMeasure,
            instructions,
            company: user
        })
    }

    static async findLastThree() {
        const threeLastMaterials = await MaterialRepository.findThreeLast();
        return threeLastMaterials;
    }

    static async findByUser(userId) {
        if(!(await CompanyValidator.isExists(userId))){
            throw new AppError('User not exists', 409); 
        }
        
        const materials = await MaterialRepository.findByUser(userId);
        return materials;
    }

    static async getById({ user, id }) {
        const material = await MaterialRepository.findById(id);

        if (!material) {
            throw new AppError('material not found', 404);
        }

        return material;
    }

    static async updateStatus(data) {

        if (!(await MaterialValidator.isExists(data.id))) throw new AppError('material is not exists', 404);

        if (!(await MaterialValidator.checkUser({ id: data.id, user: data.user}))) throw new AppError('this material not is authorized', 403);

        await MaterialRepository.updateStatus({id: data.id, status: data.status});
    }

    static async delete({ id, user }) {

        if (!(await MaterialValidator.isExists(id))) throw new AppError('material is not exists', 404);

        if (!(await MaterialValidator.checkUser({ id, user }))) throw new AppError('this material not is authorized', 403);

        await MaterialRepository.deleteById(id);
    }

    static async update({ id, bodyData: data, user }) {
        if (!(await MaterialValidator.isExists(id))) throw new AppError('material is not exists', 404);

        if (!(await MaterialValidator.checkUser({ id, user }))) throw new AppError('this material not is authorized', 403);

        await MaterialRepository.updateById(id, data);
    }
}

export default MaterialService;