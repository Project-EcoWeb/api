import { Schema, model } from "mongoose";

const materialSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true
    },
    image: String,
    description: {
        type: String,
        required: [true, 'description is required']
    },
    location: {
        type: String,
        required: [true, 'location is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required'],
        min: [1, 'one quantity is required'],
        default: 1
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    estimatedWeightKg: {
        type: Number,
        required: [true, 'weight is required'],
        min: [0, 'weight is not zero or negative']
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'finished'],
        default: 'available'
    },
    removedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    removedAt: {
        type: Date
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'user is required']
    }
}, {
    timestamps: true
});

export default model('Material', materialSchema);