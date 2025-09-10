import FeedbackRepository from "../../domain/repositorys/FeedbackRepository";
import AppError from "../../shared/error/AppError";
import MaterialValidator from "../validations/MaterialValidator.js";
import UserValidator from "../validations/UserValidator.js";
import MaterialService from "../services/MaterialService.js";

class FeedbackService{
    static async save(data) {
        if (!(await MaterialValidator.isExists(data.material))) {
            throw new AppError('material is not exists', 403);
        }

        if (!(await UserValidator.isExists(data.receiver))) {
            throw new AppError('user not exists', 403);
        }

        /**
         * Pendente criar colecção de fornecedores
         */

        const { material } = await FeedbackRepository.create(data);
        
        /**
         * Pendente atualizar o status material automaticamente
         */
    }
}

export default FeedbackService;