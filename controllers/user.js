import User from "../models/User.js"
import { createError } from "../helpers/createError.js";
export const update = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(createError('Success', 200, 'User updated successfully', updatedUser));  
}

export const remove = async (req, res) => {
    const removedUser = await User.findByIdAndRemove(req.params.id);
    res.json(createError('Success', 200, 'User deleted successfully', removedUser));
}

    export const getUsers = async (req, res) => {
    if(req.params.id === "all"){
        const users = await User.find({});
        res.json(createError('Success', 200, 'Users fetched successfully', users));
    }
}

export const getUser = async (req, res) => {
   const user = await User.findById(req.params.id);
    res.json(createError('Success', 200, 'User fetched successfully', user));
}



