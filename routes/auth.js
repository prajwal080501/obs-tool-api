import express from "express";
import {body, validationResult} from "express-validator";
import  {forgetPassword, Login, Register, resetPassword}  from "../controllers/auth.js";
import {validateRegisterRequest, validateLoginRequest, validateForgetPassword} from "../helpers/validation.js";
import { verifyForgetPasswordToken } from "../helpers/verifyToken.js";

const router = express.Router();

router.post("/register", validateRegisterRequest, Register);


router.post("/login", validateLoginRequest, Login);


router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({message: "Logged out successfully"});
});

// forget password
router.put("/forget-password", validateForgetPassword, forgetPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/verifytoken", verifyForgetPasswordToken)

export default router;