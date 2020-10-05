const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

const createToken = (req, res, next) => {
    // header => { 'authorization' : 'Bearer ' + token }
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split('')[1];
    if(token == null) {
        res
            .status(401)
            .json({
                message: "Token NOT found."
            });
    };

    jwt.verify(token)
};

module.exports = createToken;