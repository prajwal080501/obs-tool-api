import express from "express";
import {body, validationResult} from "express-validator";
import { addComment, deleteComment, getComments, getCommentsByCategory, getRepliesForComment, replyComment, updateComment } from "../controllers/comments.js";
import { validateComment } from "../helpers/validation.js";
import {verifyToken} from "../helpers/verifyToken.js";
const router = express.Router();

router.post("/addcomment", verifyToken, validateComment, addComment);
router.post("/reply/:id", verifyToken, replyComment);
router.get("/getreplies/:id", getRepliesForComment);
router.put("/updatecomment/:id", verifyToken, updateComment);
router.delete("/deletecomment/:id", verifyToken, deleteComment);
router.get("/getcomments/:id", verifyToken, getComments);
router.get("/getcommentsbycategory/:id", verifyToken, getCommentsByCategory);
router.get("/getreplies/:id", getRepliesForComment);
export default router;
