import mongoose from "mongoose";


const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    description: {
        type: String,
        
    },
    image: String,
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;