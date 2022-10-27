
import { validationResult, body } from 'express-validator';
import Comment from "../models/Comments.js";
import User from "../models/User.js";

export const addComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        console.log(req.user)
        try {
            const { comment, postId, userId } = req.body
            let user = await User.findOne({ _id: userId });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "User not found" }] })
            }
            let newComment = new Comment({
                comment,
                postId,
                userId
            })
            await newComment.save();
            res.json(newComment);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
}

