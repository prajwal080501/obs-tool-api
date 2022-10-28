import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: "Comment is required"
    },
}, {timestamps:true});


const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;