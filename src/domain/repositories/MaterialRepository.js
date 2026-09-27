import Material from '../model/Material.js';

class MaterialRepository {
    static async findAll() {
        return await Material.find({ status: 'publicado' })
            .select('name image description location quantity category unitOfMeasure instructions status company createdAt updatedAt')
            .populate({ path: 'company', select: 'name logo location' });
    }
    static async save(data) {
        return await Material.create(data);
    }
    static async findThreeLast() {
        return await Material.find({ status: 'publicado' })
            .select('name image description location quantity category unitOfMeasure instructions status company createdAt updatedAt')
            .sort({ createdAt: -1 }).limit(3);
    }
    static async findPublishedByUser(user) {
        return await Material.find({ company: user, status: 'publicado' })
            .select('name image description location quantity category unitOfMeasure instructions status company createdAt updatedAt');
    }
    static async findByUser(user) {
        return await Material.find({ company: user });
    }
    static async findById(id) {
        return await Material.findById(id).populate({ path: 'company', select: '-password' });
    }
    static async findPublishedById(id) {
        return await Material.findOne({ _id: id, status: 'publicado' })
            .select('name image description location quantity category unitOfMeasure instructions status company createdAt updatedAt')
            .populate({ path: 'company', select: 'name logo location' });
    }

    static async findAllByContainsText(text) {
        return await Material.find({
            name: { $regex: text, $options: 'i' },
            status: 'publicado'
        }).select('name image description location quantity category unitOfMeasure instructions status company createdAt updatedAt');
    }

    static async updateStatus({id, status}) {
        const material = await Material.findById(id);
        material.status = status;
        material.save();
    }

    static async deleteById(id) {
        Material.findByIdAndDelete(id).exec();
    }

    static async updateById(id, material) {
        Material.findByIdAndUpdate(id, material, { runValidators: true }).exec();
    }

    static async findByNameAndStatusAndUser(name, status, user) {
        return await Material.find({
            name: { $regex: name, $options: 'i' },
            status: status,
            company: user
        }).select('-user');
    }

    static async findByNameAndUser(name, user) {
        return await Material.find({ name: { $regex: name, $options: 'i' }, company: user }).select('-user');
    }

    static async findByStatusAndUser(status, user) {
        return await Material.find({ status, company: user }).select('-user');
    }
}

export default MaterialRepository;
