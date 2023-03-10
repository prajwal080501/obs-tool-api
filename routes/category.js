import express from "express";
import { body, validationResult } from "express-validator";
import { createCategory, getCategory } from "../controllers/category.js";
import { verifyToken } from "../helpers/verifyToken.js";

const router = express.Router();


router.post("/addcategory", [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
], verifyToken, createCategory);

router.get("/getcategory/:id", getCategory);
router.get("/getcategories", getCategory);


export default router;