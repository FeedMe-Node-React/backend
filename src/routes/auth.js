const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// CREATE User
router.post('/signup', authController.userSignup);

// LOGIN User
router.post('/login', authController.userLogin);

module.exports = router;