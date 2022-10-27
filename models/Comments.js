import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;


const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: "Comment is required"
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps:true});


const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;