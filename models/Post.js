import mongoose from "mongoose";
import express from "express";


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    video: {
        type: String,
        required: "Video is required"
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


const Post = mongoose.model("Post", PostSchema);

export default Post;