import Favorite from '../model/Favorite.js';

class FavoriteRepository {
    static async save(data) {
        await Favorite.create(data);
    }
}

export default FavoriteRepository;