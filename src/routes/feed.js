import express from 'express';
const router = express.Router();

import feedController from '../controllers/feed';
import jwtAuth from '../utils/jwtAuth';

// GET /feed/posts
router.get('/posts', jwtAuth, feedController.getPosts);

// POST /feed/post
router.post('/post', jwtAuth, feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', jwtAuth, feedController.getPost);

// PATCH /feed/post/:postId
router.patch('/post/:postId', jwtAuth, feedController.editPost);

// DELETE /feed/post/:postId
router.delete('/post/:postId', jwtAuth, feedController.deletePost);

module.exports = router;