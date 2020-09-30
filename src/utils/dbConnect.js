const mongoose = require('mongoose')

const MongoConnect = (err) => {
    if(err){
        console.log(err);
    } else {
        mongoose
        .connect('mongodb+srv://phil:delong@feedapi.1q4s7.gcp.mongodb.net/apipractice2?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
        .then(console.log("DB Connected"))
    }
};

module.exports = MongoConnect();