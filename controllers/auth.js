import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
import { createError } from "../helpers/createError.js"
dotenv.config()
import { validationResult } from 'express-validator';
import { sendEmail } from "../helpers/sendMail.js"
import { io } from "../index.js"

export const Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(createError('Failed', 400, errors.array().map((error) => {
            return error.msg
        }), null));
    }
    else {
        try {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                res.json(createError('Failed', 400, 'Invalid credentials', null));
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                res.json(createError('Failed', 400, 'Invalid Credentials', null));
            }
            const payload = {
                user: {
                    id: user._id,
                }
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 })
            const { password, ...others } = user._doc;
            res.cookie("token", token, {
                httpOnly: true,
                // add samesite none
                sameSite: "none",
                //  add token to other
            }).json(createError('Success', 200, 'Login Successful', others));

        }
        catch (err) {
            console.log(err);
            res.json(createError('Failed', 500, 'Server Error', null));
        }
    }
}

export const Register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // display only msg parameter from errors
        res.json(createError('Failed', 400, errors.array()[0].msg, null));
    }
    else {
        let { name, email, password, role } = req.body
        try {
            let user = await User.findOne({ email });
            if (user) {
                res.json(createError('Failed', 400, 'User already exists', null));
            }
            // check if user entered role else assign the default role
            if (!role) {
                role = "teacher"
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
            res.json(createError('Failed', 500, 'Server Error', null));
        }
    }
}
export const logout = async (req, res) => {
    res.clearCookie("token").json(createError('Success', 200, 'Logged out successfully', null));
}


export const forgetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    !user && res.json(createError('Failed', 400, 'User not found', null));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const { email, _id } = user;
    const reseturl = `http://localhost:8000/users/reset-password/query=${token}`;
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset your password</p>
    <a href=${reseturl} clicktracking=off>${reseturl}</a>
    `
    try {
        await sendEmail({
            to: user.email,
            subject: "Password reset request",
            text: message
        })
        res.status(200).json(createError('Success', 200, 'Email sent', null));
    }
    catch (err) {
        console.log(err);
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}


export const resetPassword = async (req, res) => {
    // get token from url 
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.json(createError('Failed', 400, 'Passwords do not match', null));
    }
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded) {
                const user = await User.findOne({ _id: decoded.id });
                if (user) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);
                    await user.save();
                    res.json(createError('Success', 200, 'Password reset successful', null));
                }
            }

        }
    }
    catch (err) {
        console.log(err);
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}



