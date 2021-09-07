import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path'
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import feedRoutes from './routes/feed';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import socket from './utils/openSocket';
import helmet from 'helmet';
import cors from 'cors';
// import aws from 'aws-sdk';
// import multerS3 from 'multer-s3';

dotenv.config();
const app = express();

const port = process.env.PORT || 8080
console.log(port);

const server = app.listen(port);

const initialize = async (server) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('Mongo Connected')

        const io = await socket.init(server);
        io.on('connection', socket => {
            console.log('Client Connected')
        })
    } catch (error) {
        console.log(error);
    }
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// const s3 = new aws.S3();

// aws.config.update({
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     region: 'us-east-2'
// });

// const fileStorage = multer({
//     fileFilter,
//     storage: multerS3({
//         acl: 'public-read',
//         s3,
//         bucket: process.env.AWS_S3_BUCKET,
//         key: function (req, file, cb) {
//             console.log(file);
//             cb(null, Date().now() + '-' + file.originalname);
//         }
//     })
// });

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/dist/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

initialize(server);