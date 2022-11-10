import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required"
    },
    role: {
        type: String,
        options: ["teacher", "admin"],
        default: "teacher"
    },
    resetToken: {
        type: String,
        default: ""
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;