const { json } = require('body-parser');
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
                .json({
                    message: "User created!",
                    data: result
                });
        });
};

exports.userLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    User
        .findOne({email})
        .then(result => {
            if(result.password == password) {
            res
                .status(201)
                .json({
                    message: 'User logged in.',
                    data: result._id,
                    token: result._id
                })
            } else {
                res.status(403)
            }
        })
        .catch(err => {
            console.log(err);
        });
};