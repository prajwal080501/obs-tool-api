import { createRequire } from 'module';
import mongoose from "mongoose"
import express from "express"
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
import authRoutes from './routes/auth.js'
import commentRoutes from './routes/comments.js'
import userRoutes from './routes/user.js'
import videoRoutes from "./routes/video.js"
import categoryRoutes from "./routes/category.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import swaggerJSdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url';
import { options } from './swagger.js'
import { Server } from "socket.io";
// import webpush 
import webpush from 'web-push'
import path from 'path';
const app = express();

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'client')));

const publicVapidKey = 'BB9UJpBDbzz_1MjbcyML_QEWyy3f5sHxX0WGn2BKmRHtKwSKtLXFTqHzcgvH8qfqjekxuFrK6tm4HDFCA1AvalY';
const privteVapidKey = 'IT0TZT0AUicBHyKUZrK9zhDvGMoX-qYoe6i00PCGUqY';


webpush.setVapidDetails('mailto:iamprajwalladkat@gmail.com', publicVapidKey, privteVapidKey);

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(cookieParser());
app.use(express.json());



dotenv.config()

const PORT = process.env.PORT || 5000;



const swaggerSpec = swaggerJSdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
    res.send("Hello World");
}, (err) => {
    console.log(err);
});

app.use('/users', authRoutes);
app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/category', categoryRoutes);


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

export const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

io.listen(5000);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();

});





