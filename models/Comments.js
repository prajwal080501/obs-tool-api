import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});