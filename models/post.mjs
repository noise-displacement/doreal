import mongoose, { model } from "mongoose";

const postSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    
    user: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Post", postSchema);