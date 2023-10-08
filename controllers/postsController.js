const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

exports.posts_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({})
    .sort({ title: 1 })
    .exec();
  res.json(allPosts);
});

exports.posts_create = asyncHandler(async (req, res, next) => {
  const existing = await Post.findOne({
    title: req.body.title,
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: 'A post with the same title and category already exists.',
    });
  }

  const post = new Post({
    category: req.body.category,
    title: req.body.title,
    text: req.body.text,
    date: new Date(),
    likes: [],
    comments: [],
  });

  try {
    await post.validate();
    const result = await post.save();
    res.json(result);
  } 
  catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({
    success: false,
    message: 'Invalid post data.',
    });
  }
})
exports.post_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.path.split('/')[req.path.split('/').length - 1])
    .exec();
  res.json(post);
})

exports.post_likes_add = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.path.split('/')[req.path.split('/').length - 1])
    .exec();
  if (post.likes.includes(req.user._id)) {
    return;
  }
  post.likes.push(req.user._id);
  post.save();
  res.json(post);
});

exports.post_likes_delete= asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.path.split('/')[req.path.split('/').length - 1])
  .exec();
  post.likes.splice(post.likes.indexOf(req.user._id), 1)
  post.save();
  return res.json(post);
})