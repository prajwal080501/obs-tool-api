import User from "../models/User.js"

export const update = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);  
}

export const remove = async (req, res) => {
    const removedUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(removedUser);
}

    export const getUsers = async (req, res) => {
    if(req.params.id === "all"){
        const users = await User.find({});
        res.status(200).json(users);
    }
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}


