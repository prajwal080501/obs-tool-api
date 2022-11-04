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

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: ' Observation API',
            version: '1.0.0',
            description: 'A classroom observation API',
            contact: {
                name: 'Classroom Observation API',
                email: '',
                version: '1.0.0'
            },
            servers: [{
                url: 'http://localhost:8000'
            },

            ]
        },


    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/** 
 * @swagger
 * /:
 * get:
 *  summary: Get the homepage
 * description: Get the homepage
 * responses:
 * 200:
 * description: A successful response
 */
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase();
}
)

