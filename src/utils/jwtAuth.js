import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        res.setHeader('Access-Control-Allow-Origin', '*');
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if (!authHeader) {
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    res.userId = decodedToken.userId;
    next();
};
