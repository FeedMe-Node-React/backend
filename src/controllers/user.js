const User = require('../models/user');

exports.getUser = (req, res, next) => {
    const userId = req.body.userId
    const user = User.findById(userId)
        .then(result => {
            console.log(result)
            res
                .status(200)
                .json({
                    status: result.status
                })
        })
};

exports.updateUser = (req, res, next) => {
    const userId = req.body.userId
    const newStatus = req.body.status
    const user = User.findByIdAndUpdate(userId)
        .then(result => {
            result.status = newStatus
            console.log(result)
            res
                .status(200)
                .json({
                    status: newStatus
                })
        })
}