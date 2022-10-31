import User from "../models/User.js"

export const update = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);  
}

export const remove = async (req, res) => {
    const removedUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(removedUser);
}

    export const getUser = async (req, res) => {
    }

