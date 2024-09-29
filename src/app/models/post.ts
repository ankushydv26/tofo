import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    done:{
        type: Boolean,
        required: true,
        default: false,
    }
})

export default mongoose.models.Post || mongoose.model('Post', postSchema)
