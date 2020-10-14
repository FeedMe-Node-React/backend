const User = require('../models/user');
const Post = require('../models/post');

exports.getDashboard = async (req, res, next) => {
    try {
        const userId = req.body.userId
        const user = await User.findById(userId);
        const posts = await Post.find({user: userId});
        res.status(200).json({
            user: user,
            posts: posts
        });
    } catch(error) {
        res.status(500);
        console.log(error);
    }
}

exports.getStatus = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        res.status(200).json({ 
            status: user.status 
        });
    } catch(error) {
        res.status(500);
        console.log(error);
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const newStatus = req.body.status;
        const user = await User.findByIdAndUpdate(userId);
        user.status = newStatus;
        user.save();
        console.log(user)
        res.status(200).json({ 
            status: user.status
        });
    } catch(error) {
        res.status(500);
        console.log(error);
    }
};