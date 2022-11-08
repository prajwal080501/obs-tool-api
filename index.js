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
import webpush from "web-push"
import { options } from './swagger.js'


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
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

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();

});

const io = createRequire(import.meta.url)('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
}
)
const privateVapidKey = "FFThIFKsimwq00FU-f3tKP5fDCIRgXfrruOcSZap--Q"
const publicVapidKey = "BI18JfwP0NUMt50W5orhGMzLKh7Wy5_fvbwBU92sGBma91yYNNbeTcGcujRrJsIBoYzcuqVILPR7SktG2MPSUeU";

webpush.setVapidDetails(
    "mailto:praju.ladkat@gmai.com",
    publicVapidKey,
    privateVapidKey

)




