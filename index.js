import mongoose from "mongoose"
import express from "express"
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comments.js'
const app = express();


app.use(express.json());

dotenv.config()

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
}, (err) => {
    console.log(err);
});

app.use('/users',
    authRoutes)

app.use('/comments',
    commentRoutes)

function connectToDatabase() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log(err);
        })
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();
}
)

