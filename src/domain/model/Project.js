import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: String,
    description: String,
    materials: [String],
    stages: [String],
    video: String,
    category: String,
    difficulty: {
        type: String,
        enum: ['Facil', 'Medio', 'Dificil']
    }
})

export default model('Project', projectSchema);