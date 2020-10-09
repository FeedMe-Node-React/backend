const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MongoConnect = async (error) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true 
        });
        console.log("DB Connected")
    } catch (error) {
        console.log(error);
    }
};

module.exports = MongoConnect();