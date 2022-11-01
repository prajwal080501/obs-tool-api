import express from "express";
import {body, validationResult} from "express-validator";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comments.js";
import {verifyToken} from "../helpers/verifyToken.js";
const router = express.Router();

router.post("/addcomment", verifyToken,addComment);
router.put("/updatecomment/:id", verifyToken, updateComment);
router.delete("/deletecomment/:id", verifyToken, deleteComment);
router.get("/getcomments/:id", verifyToken, getComments);

export default router;
