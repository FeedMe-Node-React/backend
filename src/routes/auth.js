import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/signup', authController.userSignup);
router.post('/login', authController.userLogin);

module.exports = router;