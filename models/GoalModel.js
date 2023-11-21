import mongoose from 'mongoose'

const GoalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Goal = mongoose.model("goals", GoalSchema)

export default Goal