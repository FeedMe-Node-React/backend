const User = require('../models/user');

exports.getUser = (req, res, next) => {
    const userId = req.body.userId
    User.findById(userId)
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
    User.findByIdAndUpdate(userId)
        .then(result => {
            result.save()
            result.status = newStatus
            console.log(result)
            res
                .status(200)
                .json({
                    status: newStatus
                })
        })
}