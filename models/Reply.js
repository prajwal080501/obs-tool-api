import mongoose from "mongoose"

const ReplySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    // videoId: {
    //     type: String,
    //     required: true
    // },
    commentId: {
        type: String,
        required: true
    },
    reply: {    
        type: String,
        required: true
    },
    replyBy: {
        type: String,
        required: true
    },
    replyTo: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Reply = mongoose.model("Reply", ReplySchema);

export default Reply;