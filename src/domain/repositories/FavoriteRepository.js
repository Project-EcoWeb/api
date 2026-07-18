import Favorite from '../model/Favorite.js';

class FavoriteRepository {
    static async save(data) {
        await Favorite.create(data);
    }
    static async findAllByUser({ user, type }) {
        if (!type) {
            return await Favorite.find({ user });
        } else {
            type = type.charAt(0).toUpperCase() + type.slice(1);
            console.log(type);
            return await Favorite.find({ user: user, onModel: type });
        }
    }
    static async countFavoritesByUser(user) {
        return await Favorite.countDocuments({ user });
    }
}

export default FavoriteRepository;