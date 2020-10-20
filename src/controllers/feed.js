import image from '../../../frontend/src/components/Image/Image';
import Post from '../models/post';
import socket from '../utils/openSocket';

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    console.log(error);
  };
};

exports.createPost = async (req, res, next) => {
  try {
    const { body, file } = req;

    const {
      content,
      title,
      userId: user,
    } = body;

    const {
      path: image
    } = file

    const post = await Post.create({
      title,
      content,
      image,
      user,
    });

    console.log(post);

    const io = socket.getIo();

    io.emit('posts', {
      action: 'create',
      post,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500);
    console.log(error);
  };
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    console.log(error);
  };
};

exports.editPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId)
    const postImage = () => {
      if(!req.file.path) {
        post.image;
      } else {
      req.file.path;
    };
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = postImage();
    post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500)
    console.log(error);
  };
};

exports.deletePost = async (req, res, next) => {
  try {
    const userId = res.userId;
    const postId = req.params.postId;
    const post = await Post.findOneAndDelete({
      user: userId,
      _id: postId
    });
    const io = socket.getIo();
    if (post) {
      io.emit('posts', {
        action: 'delete',
        post: post
      });
      res.status(200).json(post);
    } else {
      res.status(403).json();
    };
    next();
  } catch (error) {
    res.status(500).json(error)
  }
};