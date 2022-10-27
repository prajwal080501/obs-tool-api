
import { validationResult } from 'express-validator';


export const CreateComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else{
    const { comment, user, post } = req.body
    try {
        let comment = await Comment.findOne({ comment });
        if (comment) {
            return res.status(400).json({ errors: [{ msg: "Comment already exists" }] })
        }
        comment = new Comment({
            comment,
            user,
            post
        })
        await comment.save();
        res.json({
            comment,
            "message":`comment created by ${user}`
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
}
}