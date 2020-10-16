import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

exports.userSignup = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = bcrypt.hashSync(req.body.password);
        const name = req.body.name;
        const user = await new User({
            email: email,
            password: password,
            name: name,
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
        const user = await User.findOne({email})
        const access = await bcrypt.compare(req.body.password, user.password);
        if(access) {
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