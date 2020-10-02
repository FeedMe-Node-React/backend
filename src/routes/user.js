const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/:userId', userController.getUser);
router.patch('/:userId', userController.updateUser);

module.exports = router;