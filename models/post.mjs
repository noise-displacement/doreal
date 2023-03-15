import mongoose, { model } from "mongoose";

const postSchema = mongoose.Schema({
    user: {
        type: Object,
        required: true
    },

    text: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Post", postSchema);