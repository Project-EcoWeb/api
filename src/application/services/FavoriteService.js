import FavoriteRepository from '../../domain/repositorys/FavoriteRepository.js';

class FavoriteService {
    static async save(data) {
        await FavoriteRepository.save(data);
    }
}

export default FavoriteService;