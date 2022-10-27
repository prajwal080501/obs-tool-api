import express from "express";
import {body, validationResult} from "express-validator";
import  {Register}  from "../controllers/auth.js";
import { CreateComment } from "../controllers/comments.js";

const router = express.Router();

router.post("/createcomment", [
    body("comment", "Comment is required").not().isEmpty(),
    body("user", "User is required").not().isEmpty(),
    body("post", "Post is required").not().isEmpty()
], CreateComment);
export default router;