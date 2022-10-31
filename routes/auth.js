import express from "express";
import {body, validationResult} from "express-validator";
import  {Login, Register}  from "../controllers/auth.js";
import {validateRegisterRequest, validateLoginRequest} from "../helpers/validation.js";

const router = express.Router();

router.post("/register", validateRegisterRequest, Register);


router.post("/login", validateLoginRequest, Login);


export default router;