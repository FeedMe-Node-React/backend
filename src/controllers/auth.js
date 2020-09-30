// const bcrypt = require('bcryptjs')
const User = require('../models/user');

exports.userSignup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const user = new User({
        email: email,
        password: password,
        name: name
    })
    user
        .save()
        .then(result => {
            console.log(result)
            res
                .status(201)
                .json(result);
        });
};

exports.userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User
        .find({email})
        .then(result => {
            if(result[0].password == password) {
                res
                    .status(200)
                    .json(result);
            };
        })
        .catch(err => {
            console.log(err);
        });
};