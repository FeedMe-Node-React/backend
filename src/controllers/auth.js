const { json } = require('body-parser');
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.userSignup = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const user = await new User({
            email: email,
            password: password,
            name: name
        });
        user.save();
        console.log(user);
        res.status(201).json(user);
    } catch(error) {
        console.log(error);
    }
};

exports.userLogin = async (req, res, next) => {
    try {    
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email})
        if(user.password === password) {
            res.status(201).json({
                data: user._id,
                token: jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '1h' }
                )
            });
        };
        console.log(user);
    } catch(error) {
        res.status(403);
        console.log(error);
    } 
};