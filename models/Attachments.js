import mongoose from "mongoose";


const AttachmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    url: {
        type: String,
        required: "URL is required"
    },
    file: {
        type:File,
        required: "File is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});