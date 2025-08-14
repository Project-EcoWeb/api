import Favorite from '../model/Favorite.js';

class FavoriteRepository {
    static async save(data) {
        await Favorite.create(data);
    }
    static async findAll() {
        if (arguments.length === 0) {
            return await Favorite.find();
        } else {
            return await Favorite.find({ type: arguments[0] });
        }
    }
}

export default FavoriteRepository;