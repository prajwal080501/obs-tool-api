import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
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
