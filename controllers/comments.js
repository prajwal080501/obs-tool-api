import Comments from '../models/Comments.js';
import Video from '../models/Video.js';

export const addComment = async (req, res) => {

    try {
        const newComment = new Comments({
            userId: req.user.user.id,
            ...req.body
        });
        const comment = await newComment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        const video = await Video.findById(res.params.id);
        if (!comment) {
            res.status(404).json({
                status: "Error",
                code: 404,
                msg: "Comment not found"
            });
        }
        if (comment.userId === req.user.user.id || video.userId === req.user.user.id) {
            const deletedComment = await Comments.findByIdAndDelete(req.params.id);
            res.status(200).json(deletedComment);
        }
        else {
            res.status(403).json({
                status: "Error",
                code: 403,
                message: "You can only delete your comment"
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            res.status(404).json({
                status: "Error",
                code: 404,
                msg: "Comment not found"
            });
        }
        if (comment.userId === req.user.user.id) {
            const updatedComment = await Comments.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedComment);
        }
        else {
            res.status(403).json({
                status: "Error",
                code: 403,
                message: "You can only update your comment"
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const getComments = async (req, res) => {
    //    get comments for a video
    try {
        const comments = await Comments.find({ videoId: req.params.id });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json(error);
    }
}