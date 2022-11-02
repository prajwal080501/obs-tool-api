import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User Id is required"],
    },
    uploadedBy: {
        type: String,
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
        required: [true, "Video Url is required"],
    }

}, {timestamps: true});

const Video = mongoose.model("Video", VideoSchema);

export default Video;