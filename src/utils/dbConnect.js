// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const express = require('express');

// const app = express()
// dotenv.config();

// const MongoConnect = async (error) => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, { 
//             useUnifiedTopology: true, 
//             useNewUrlParser: true, 
//             useCreateIndex: true 
//         });

//         const server = app.listen(8080);
//         const io = require('./openSocket').init(server);

//         io.on('connection', socket => {
//             console.log("Listening on port: 8080");
//         })

//         console.log("DB Connected")
//     } catch (error) {
//         console.log(error);
//     }
// };

// module.exports = MongoConnect();