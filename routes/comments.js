import express from "express";
import {body, validationResult} from "express-validator";
import  {Register}  from "../controllers/auth.js";
import { addComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/addcomment", 
addComment);

export default router;
