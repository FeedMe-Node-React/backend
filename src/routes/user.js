const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const jwtAuth = require('../utils/jwtAuth');

router.get('/dashboard', jwtAuth, userController.getDashboard);

router.post('/:userId', userController.getStatus);
router.patch('/:userId', userController.updateStatus);

module.exports = router;