import Comments from '../models/Comments.js';
import Video from '../models/Video.js';
import { createError } from '../helpers/createError.js';
export const addComment = async (req, res) => {

    try {
        const newComment = new Comments({
            userId: req.user.user.id,
            ...req.body
        });
        const comment = await newComment.save();
        res.json(createError('Success', 200, 'Comment added successfully', comment));
    } catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        const video = await Video.findById(res.params.id);
        if (!comment) {
            res.json(createError('Failed', 400, 'Comment not found', null));
        }
        if (comment.userId === req.user.user.id || video.userId === req.user.user.id) {
            const deletedComment = await Comments.findByIdAndDelete(req.params.id);
            res.json(createError('Success', 200, 'Comment deleted successfully', deletedComment));
        }
        else {
            res.json(createError('Failed', 400, 'You are not authorized to delete this comment', null));
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            res.json(createError('Failed', 400, 'Comment not found', null));
        }
        if (comment.userId === req.user.user.id) {
            const updatedComment = await Comments.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.json(createError('Success', 200, 'Comment updated successfully', updatedComment));
        }
        else {
            res.json(createError('Failed', 400, 'You are not authorized to update this comment', null));
        }
    }
    catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}

export const getComments = async (req, res) => {
    //    get comments for a video
    try {
        const comments = await Comments.find({ videoId: req.params.id });
        res.json(createError('Success', 200, 'Comments fetched successfully', comments));
    }
    catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}