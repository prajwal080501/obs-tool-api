import express from "express";
import { body, validationResult } from "express-validator";
import { createCategory, getCategory } from "../controllers/category.js";

const router = express.Router();


router.post("/addcategory", [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
], createCategory);

router.get("/getcategory/:id", getCategory);


export default router;