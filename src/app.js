import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path'
import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();
const app = express();

import feedRoutes from './routes/feed';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
// require('./utils/dbConnect');

const MongoConnect = async (error) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true 
        });
        const server = app.listen(8080);
        import io from ('./utils/openSocket').init(server);
        io.on('connection', socket => {
            
        })
    } catch (error) {
        console.log(error);
    }
};
MongoConnect();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images');
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

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
    
app.use('/src/images', express.static(path.join(__dirname, 'images')));
    
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);