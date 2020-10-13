const Post = require('../models/post');
const io = require('../utils/openSocket');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    console.log(posts)
    res.status(200).json(posts); 
  } catch(error) {
    res.status(500);
    console.log(error);
  };
};

exports.createPost = async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const image = req.file.path;
    const userId = req.body.userId;
    const post = await Post.create({
      title: title,
      content: content,
      image: image,
      user: userId,
    });
    io.init()
    io.getIo().emit('posts', {
      action: 'create',
      post: post
    });    
    res.status(201).json(post);
  } catch(error) {
    res.status(500);
    console.log(error);
  };
};
  
exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch(error) {
    res.status(500)
    console.log(error);
  };
};
    
exports.editPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndUpdate(postId)
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = post.image
    post.save();
    res.status(200).json(post);
  } catch(error) {
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
    if(post) {
      res.status(200).json(post);
    };
    next();
  } catch(error) {
    res.status(403).json(error)
  }
};