import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    commentBy: {
        type: String,
    },
    videoId: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;