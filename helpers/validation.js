import {body, validationResult} from "express-validator";

export const validateRegisterRequest = [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a password with 6 or more characters").isLength({min: 6})
];

export const validateLoginRequest = [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
    body("password", "Please enter a password, it cant be empty").not().isEmpty()
];
