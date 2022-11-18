import Comments from '../models/Comments.js';
import Video from '../models/Video.js';
import Category from '../models/Category.js';
import { createError } from '../helpers/createError.js';
import User from './../models/User.js';
import webpush from 'web-push';
import { body, validationResult } from "express-validator";
import { io } from "../index.js"
import Reply from './../models/Reply.js';
export const addComment = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(createError(400, 'Failed to add comment', errors.array().map(error => error.msg), null));
        }
        else {
            const category = await Category.findById(req.body.categoryId);
            const user = await User.findById(req.user.user.id);
            console.log(user);
            const newComment = new Comments({
                userId: req.user.user.id,
                category: category.name,
                commentBy: user.name,
                rating: user.role === 'coach' ? req.body.rating : null,
                ...req.body
            });
            const comment = await newComment.save();
            io.emit('newComment', comment);
            res.json(createError('Success', 200, 'Comment added successfully', comment));


            const payload = JSON.stringify({
                title: 'New Comment',
                body: 'New comment added to your video'
            });

            // pass object into sendNotification
            webpush.sendNotification(comment, payload).catch(error => console.error(error));


        }
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


export const replyComment = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(createError(400, 'Failed to add reply', errors.array().map(error => error.msg), null));
        }
        else {
            const comment = await Comments.findById(req.params.id);
            if (!comment) {
                res.json(createError('Failed', 400, 'Comment not found', null));
            }
            const user = await User.findById(req.user.user.id);
            console.log(user.name, comment.commentBy);
            const newReply = new Reply({
                userId: req.user.user.id,
                commentId: req.params.id,
                replyBy: user.name,
                replyTo: comment.commentBy,
                ...req.body
            });
            const reply = await newReply.save();
            res.json(createError('Success', 200, 'Reply added successfully', reply));
        }
    } catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}


export const getRepliesForComment = async (req, res) => {
    try {
        const replies = await Reply.find({ commentId: req.params.id });
        res.json(createError('Success', 200, 'Replies fetched successfully', replies));
    }
    catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}


export const getCommentsByCategory = async (req, res) => {
    //    get comments for a category
    try {

    }
    catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}

export const getCommentsWithReplies = async (req, res) => {
    //    get comments with replies for a video
    try {
        const comments = await Comments.find({ videoId: req.params.id });
        const commentsWithReplies = await Promise.all(comments.map(async (comment) => {
            const replies = await Reply.find({ 
                comment,
                commentId: comment._id
            });
            return {
                ...comment._doc,
                replies
            }

    }));
        res.json(createError('Success', 200, 'Comments fetched successfully', commentsWithReplies));
    }
    catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}
