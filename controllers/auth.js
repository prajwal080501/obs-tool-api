import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
dotenv.config()
import { validationResult } from 'express-validator';


export const Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    else {
        try {
            const { email, password } = req.body
            let user = await User.findOne({ email }).select("+password");
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 })


            res.cookie("token", token, {
             httpOnly: true
            }).sendStatus(200);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
}

export const Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        let { name, email, password, role } = req.body
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] })
            }
            // check if user entered role else assign the default role
            if (!role) {
                role = "user"
            }
            user = new User({
                name,
                email,
                password,
                role
            })
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
}


