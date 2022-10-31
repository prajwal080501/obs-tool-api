import express from 'express';
import { verifyToken } from '../helpers/verifyToken.js';
import {addVideo, deleteVideo, getVideos, getVideo} from "../controllers/video.js";
const router = express.Router();

router.post("/addvideo", verifyToken, addVideo);
router.delete("/deletevideo", verifyToken, deleteVideo);
router.get("/getvideos", verifyToken, getVideos);
router.get("/getvideo/:id", verifyToken, getVideo);


export default router;

