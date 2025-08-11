import { model, Schema } from 'mongoose';

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['project', 'material']
    },
    referencesId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model('Favorite', favoriteSchema);