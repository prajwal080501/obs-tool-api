import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
        required: true,
    }

}, {timestamps: true});

const Video = mongoose.model("Video", VideoSchema);

export default Video;