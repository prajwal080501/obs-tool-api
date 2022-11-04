import Category from '../models/Category.js';
import { createError } from "../helpers/createError.js"


export const createCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        next(createError(error));
    }
}

export const getCategory = async (req, res, next) => {
    try {
        if (req.params.id = "all") {
            const categories = await Category.find();
            res.status(200).json(categories);
        }
        else {
            const category = await Category.findById(req.params.id);
            res.status(200).json(category);
        }
    }
    catch (error) {
        next(createError(error));
    }
}
