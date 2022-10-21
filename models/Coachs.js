import mongoose from "mongoose";

const CoachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});