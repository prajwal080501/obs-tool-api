import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({
            status: "error",
            code: 401,
            msg: "Access denied"
        });
    }
    else {
        const token = authHeader.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: "error",
                    code: 403,
                    msg: "Invalid token"
                });
            }
            req.user = user;
            console.log(user);
            next();
        });
    }
}

export const verifyForgetPasswordToken = (req, res) => {
    const token = req.query;
    res.send(token);
}
