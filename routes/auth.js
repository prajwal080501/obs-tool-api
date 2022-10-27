import express from "express";
import {body, validationResult} from "express-validator";
import  {Login, Register}  from "../controllers/auth.js";


const router = express.Router();

router.post("/register", [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a password with 6 or more characters").isLength({min: 6})
], Register);


router.post("/login", [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists()
], Login);

export default router;