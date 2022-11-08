import { body, validationResult } from "express-validator";

export const validateRegisterRequest = [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
];

export const validateLoginRequest = [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
    body("password", "Please enter a password, it cant be empty").not().isEmpty()
];


export const validateVideoRequest = [
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
    body("videoUrl", "Url is required").not().isEmpty(),
    body("videoUrl", "Please enter a valid url").isURL(),
];

export const validateComment = [
    body("comment", "Comment is required").not().isEmpty(),
    body("videoId", "VideoId is required").not().isEmpty(),
    body("categoryId", "Category is required").not().isEmpty(),
];


export const validateForgetPassword = [
    body("email", "Please enter a valid email").isEmail(),
    body("email").isEmpty().withMessage("Email is required"),
];
