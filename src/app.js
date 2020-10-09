const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const express = require('express');

const app = express();

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

require('./utils/dbConnect');

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

app.use(bodyParser.json()); // application/json

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );

app.use('/src/images', express.static(path.join(__dirname, 'images')));

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

const server = app.listen(8080);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("Listening on port: 8080");
})