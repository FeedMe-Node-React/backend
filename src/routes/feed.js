import express from 'express';
import feedController from '../controllers/feed';
import jwtAuth from '../utils/jwtAuth';

const router = express.Router();

router.get('/posts', jwtAuth, feedController.getPosts);
router.post('/post', jwtAuth, feedController.createPost);
router.get('/post/:postId', jwtAuth, feedController.getPost);
router.patch('/post/:postId', jwtAuth, feedController.editPost);
router.delete('/post/:postId', jwtAuth, feedController.deletePost);

module.exports = router;