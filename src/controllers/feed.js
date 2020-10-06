const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
  Post.find().then(result => {
    res
      .status(200)
      .json({
        message: "Posts successfully fetched",
        posts: result
      });
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;
  const userId = req.body.userId;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: userId,
  });

  let creator;

  post
    .save()
    .then(result => {
      return User.findById(userId);
    })
    .then(user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      res
        .status(201)
        .json({
          message: 'Post created successfully!',
          post: result,
          creator: {
            _id: creator._id,
            name: creator.name
          }
        });
    })
    .catch(err => {
      console.log(err);
    });
  };
  
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post
    .findById(postId)
    .then(result => {
      res
        .status(200)
        .json({
          post: result
        });
    })
    .catch(err => {
      console.log(err);
    });
  };
    
exports.editPost = (req, res, next) => {
  const postId = req.params.postId;
  Post
  .findByIdAndUpdate(postId)
  .then(result => {
    result.title = req.body.title;
    result.content = req.body.content;
    result.imageUrl = req.body.imageUrl;
    result.save();
    res
      .status(200)
      .json({
        post: result
      });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post
    .findByIdAndDelete(postId)
    .then(result => {
      return User.find(req.userId)
    })
    .then(user => {
      user[0].posts.pull(postId);
      console.log(user[0].posts)
      return user[0].save();
    })
    .then(result => {
      res
        .status(200)
        .json({post: result})
    })
    .catch(err => {
      console.log(err);
    });
};