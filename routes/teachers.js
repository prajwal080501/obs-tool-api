import express from "express";
import { teacherSignIn, teacherSignUp } from "../controllers/teachers.js";
import { body } from "express-validator";
const router = express.Router();
router.post("/signin", (req, res)=>{
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists()
},
teacherSignIn);


router.post("/signup", teacherSignUp)

export default router;


