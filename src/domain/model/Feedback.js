import { model, Schema } from 'mongoose';


const feedbackSchema = new Schema({
    material: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: [true, 'id material is required']
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'id user supplier is required']
    },
    receiver: {
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