import express from "express";
import {body, validationResult} from "express-validator";
import {createPost} from "../controllers/post.js";

const router = express.Router();

router.post("/createpost", [
    body("title", "Title is required").not().isEmpty(),
    body("body", "Body is required").not().isEmpty(),
    body("userId", "User Id is required").not().isEmpty()
], createPost);

export default router;