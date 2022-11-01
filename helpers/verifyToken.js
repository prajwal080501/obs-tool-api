import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ errors: [{ msg: "Token present but not valid" }] })
            }
            else {
                req.user = user;
                next();
            }

        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: [{ msg: "Server error" }] })
    }
}

