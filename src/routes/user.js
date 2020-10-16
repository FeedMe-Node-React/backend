import express from 'express';
import userController from '../controllers/user';
import jwtAuth from '../utils/jwtAuth';

const router = express.Router();

router.get('/dashboard', jwtAuth, userController.getDashboard);
router.post('/:userId', userController.getStatus);
router.patch('/:userId', userController.updateStatus);

module.exports = router;