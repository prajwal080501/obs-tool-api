
import Video from "../models/Video.js";
import User from "../models/User.js";
import { createError } from "../helpers/createError.js";
import { validationResult } from "express-validator";
export const addVideo = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id);
        if (user.role === "teacher") {
            const newVideo = new Video({
                userId: req.user.user.id,
                uploadedBy: user.name,
                ...req.body
            });

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json(createError('Failed', 400, errors.array().map((error) => {
                    return error.msg
                }), null));
            }
            const video = await newVideo.save();
            res.json(createError('Success', 200, 'Video added successfully', video));
        }
        else {
            res.json(createError('Failed', 400, 'You are not authorized to add video', null));
        }

    }

    catch (err) {
        console.log(err);
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}

export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            res.json(createError('Failed', 400, 'Video not found', null));
        }
        if (video.userId === req.user.user.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(createError('Success', 200, 'Video updated successfully', updatedVideo));

        }
        else {
            res.json(createError('Failed', 400, 'You are not authorized to update this video', null));
        }
    } catch (error) {
        res.json(createError('Failed', 500, 'Server Error', null));
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            res.json(createError('Failed', 400, 'Video not found', null));
        }
        if (video.userId === req.user.user.id) {
            const deletedVideo = await Video.findByIdAndDelete(req.params.id);
            res.json(createError('Success', 200, 'Video deleted successfully', deletedVideo));
        }
        else {
            res.json(createError('Failed', 400, 'You are not authorized to delete this video', null));
        }
    } catch (error) {
        res.status(500).json(error);
    }

}

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            res.json(createError('Failed', 400, 'Video not found', null));
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json(error);
    }

}


export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.status(200).json(videos);
    } catch (error) {
        res.status(500).json(createError('Failed', 500, 'Server Error', null));
    }
}


export const getMyVideos = async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.user.user.id });
        return res.status(200).json(videos);
    } catch (error) {
        res.status(500).json(createError('Failed', 500, 'Server Error', null));
    }
}