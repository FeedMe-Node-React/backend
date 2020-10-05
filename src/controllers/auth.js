const { json } = require('body-parser');
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userSignup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const user = new User({
        email: email,
        password: password,
        name: name
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res
                .status(201)
                .json({
                    message: "User created!",
                    data: result
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User
        .findOne({email})
        .then(result => {
            if(result.password === password) {
                res
                    .status(201)
                    .json({
                        message: 'User logged in.',
                        data: result._id,
                        token: jwt.sign(
                            {
                                email: result.email,
                                userId: result._id
                            }, 
                            process.env.JWT_SECRET,
                            {
                                expiresIn: '1h'
                            }
                        )
                    });
            } else {
                res
                    .status(403)
                    .json({
                        message: 'Login failed: Email or Password incorrect.'
                    })
            };
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};