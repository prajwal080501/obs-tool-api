import express from 'express';
import { verifyToken } from '../helpers/verifyToken.js';
import {addVideo, deleteVideo, updateVideo, getVideos, getVideo} from "../controllers/video.js";
const router = express.Router();

router.post("/addvideo", verifyToken, addVideo);
router.delete("/deletevideo/:id", verifyToken, deleteVideo);
router.put("/updatevideo/:id", verifyToken, updateVideo);
router.get("/getvideos", verifyToken, getVideos);
router.get("/getvideo/:id", verifyToken, getVideo);


export default router;

