import express from 'express';
import { verifyToken } from '../helpers/verifyToken.js';
import {addVideo, deleteVideo, updateVideo, getVideos, getVideo} from "../controllers/video.js";
import { validateVideoRequest } from '../helpers/validation.js';
const router = express.Router();

router.post("/addvideo", verifyToken, validateVideoRequest, addVideo);
router.delete("/deletevideo/:id", verifyToken, deleteVideo);
router.put("/updatevideo/:id", verifyToken, updateVideo);
router.get("/getvideos",getVideos);
router.get("/getvideo/:id", verifyToken, getVideo);


export default router;

