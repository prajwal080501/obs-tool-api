import jwt from "jsonwebtoken";

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

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }
    next();
}

export const verifyUser = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }
    next();
}

export const verifyAdminOrUser = (req, res, next) => {

    if (req.user.role !== "admin" && req.user.role !== "user") {
        return res.status(401).json({ errors: [{ msg: "Not authorized" }] })
    }
    next();
}   