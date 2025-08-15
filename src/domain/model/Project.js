import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'], 
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    image: {
        type: String,
        required: [true, 'image is required']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    materials: {
        type: [String],
        required: [true, ' material is required'],
        min: [1, 'one material is required']
    },
    stages: {
        type: [String],
        required: [true, 'One stage is required'],
        min: [1, 'one stage is required']
    },
    video: String,
    category: {
        type: String,
        required: [true, 'category is required']
    },
    difficulty: {
        type: String,
        enum: ['Facil', 'Medio', 'Dificil'],
        required: true
    }
}, {
    timestamps: true
})

export default model('Project', projectSchema);