import { Schema, model } from "mongoose";

const materialSchema = new Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    quantity: String,
    category: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default model('Material', materialSchema);