import express from 'express';
const router = express.Router();
import userController from '../controllers/user';
import jwtAuth from '../utils/jwtAuth';

router.get('/dashboard', jwtAuth, userController.getDashboard);

router.post('/:userId', userController.getStatus);
router.patch('/:userId', userController.updateStatus);

module.exports = router;