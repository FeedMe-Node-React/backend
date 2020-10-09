const Post = require('../models/post');
const { deleteOne } = require('../models/user');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
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
    const imageUrl = req.file.path;
    const userId = req.body.userId;
    const post = await Post.create({
      title: title,
      content: content,
      imageUrl: imageUrl,
      user: userId,
    });
    res.json(post);
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
    post.imageUrl = post.imageUrl
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
    const post = await Post.deleteOne({ 
      _id: postId, 
      user: userId 
    })
    if(!post) {
      res.status(200).json(post)
    } else {

    }
  } catch(error) {
    res.status(403)
    console.log(error);
  };
};