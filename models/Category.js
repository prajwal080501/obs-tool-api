import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    description: {
        type: String,
    },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
