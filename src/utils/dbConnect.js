const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MongoConnect = (err) => {
    if(err){
        console.log(err);
    } else {
        mongoose
            .connect(process.env.MONGODB_URI, { 
                useUnifiedTopology: true, 
                useNewUrlParser: true, 
                useCreateIndex: true 
            })
            .then(console.log("DB Connected"))
            .catch(err => {
                console.log(err);
            });
    }
};

module.exports = MongoConnect();