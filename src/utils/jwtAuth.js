import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    console.log(authHeader);
    if (!authHeader) {
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if (!authHeader) {
        const error = new Error('Not Authenticated.');
        error.statusCode = 401;
        throw error;
    }
    res.setHeader('Allow-Control-Allow-Origin', '*');
    res.userId = decodedToken.userId;
    next();
};
