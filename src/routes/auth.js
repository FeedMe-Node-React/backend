import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

// CREATE User
router.post('/signup', authController.userSignup);

// LOGIN User
router.post('/login', authController.userLogin);

module.exports = router;