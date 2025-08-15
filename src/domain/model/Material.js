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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
})

export default model('Material', materialSchema);