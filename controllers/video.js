
import Video from "../models/Video.js";
import User from "../models/User.js";
export const addVideo = async (req, res) => {
    try {

        
        const newVideo = new Video({
            userId: req.user.user.id,
            ...req.body
        });
        const video = await newVideo.save();
        res.status(200).json(video);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: "Server error" }] })
    }
}

export const updateVideo = async (req, res) => {
try {
    const video = await Video.findById(req.params.id);
    if(!video) {
        res.status(404).json({
            status: "Error",
            code: 404,
            msg: "Video not found"});
    }
    if (video.userId === req.user.id) {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(updatedVideo);

    }
    else {
        res.status(403).json({
            status: "Error",
            code: 403,
            message: "You can only update your video"
        });
    }
} catch (error) {
    res.status(500).json(error);
}
}

export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) {
            res.status(404).json({
                status: "Error",
                code: 404,
                msg: "Video not found"});
        }
        if (video.userId === req.user.id) {
            const deletedVideo = await Video.findByIdAndDelete(req.params.id);
            res.status(200).json(deletedVideo);
        }
        else {
            res.status(403).json({
                status: "Error",
                code: 403,
                message: "You can only delete your video"
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
    
}

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) {
            res.status(404).json({
                status: "Error",
                code: 404,
                msg: "Video not found"});
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json(error);
    }

}


export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json(error);
    }
}
