import FavoriteRepository from '../../domain/repositorys/FavoriteRepository.js';

class FavoriteService {
    static async save(data) {
        await FavoriteRepository.save(data);
    }
    static async getAllByUser(data) {
        if (!data.type) {
            return await FavoriteRepository.findAll();
        }

        return await FavoriteRepository.findAll(data.type);
    }
}

export default FavoriteService;