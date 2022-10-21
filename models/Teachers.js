import mongoose from "mongoose";


const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    description: {
        type: String,
        required: "Description is required"
    },
    image: String,
});