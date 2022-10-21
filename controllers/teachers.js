import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Teacher from "../models/Teachers.js"
import {body, validationResult} from "express-validator"
export const teacherSignIn = () => {
    const { email, password } = req.body;

}

export const teacherSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        let teacher = await Teacher.findOne({ email });
        if (teacher) {
            return res.status(400).json({ msg: "Teacher already exists" });
        }
        teacher = new Teacher({
            name,
            email,
            password,
        });
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(password, salt);
        await teacher.save();
        const payload = {
            teacher: {
                id: teacher.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
}

