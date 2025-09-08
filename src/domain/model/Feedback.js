import { model, Schema } from 'mongoose';


const feedbackSchema = new Schema({
    materialId: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: [true, 'id material is required']
    },
    idUserSupplier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'id user supplier is required']
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'id user receiving is required']
    },
    text: {
        type: String,
    },
}, {
    timestamps: true
});


export default model('Feedback', feedbackSchema);