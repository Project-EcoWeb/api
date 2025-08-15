import { model, Schema, SchemaType } from 'mongoose';

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    onModel: {
        type: String,
        enum: ['project', 'material'],
        required: true
    },
    references: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

favoriteSchema.index({ user: 1, onModel: 1, reference: 1 }, { unique: true });

export default model('Favorite', favoriteSchema);