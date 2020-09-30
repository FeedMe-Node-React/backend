const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', feedController.createPost);

// GET /feed/post/:postId
router.get('/post/:postId', feedController.getPost)

// PATCH /feed/post/:postId
router.patch('/post/:postId', feedController.editPost)

// DELETE /feed/post/:postId
router.delete('/post/:postId', feedController.deletePost)

module.exports = router;