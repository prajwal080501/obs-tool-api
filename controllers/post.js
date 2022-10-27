import Post from "../models/Post.js"


export const createPost = (req, res) => {

        try {
            const { title, body, userId } = req.body;
            let user = User.findOne({ _id: userId });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: "User does not exist" }] })
            }
            let newPost = new Post({
                title,
                body,
                userId,
                name: user.name
            })
            newPost.save();
            res.json(newPost);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Server error");
        }
    }
