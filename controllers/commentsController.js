const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

exports.comments_create = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.body.postId)
    .exec();
  const comment = new Comment({
    author: req.user._id,
    text: req.body.comment,
    date: new Date(),
  })
  console.log(post.comments)
  await post.comments.push(comment);
  await comment.save();
  await post.save();
  res.json(comment);
})

exports.comments_list = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.query.postId;

    if (!postId) {
      return res.status(400).json({ error: 'postId is missing' });
    }

    const post = await Post.findById(postId).populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    }).exec();

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ comments: post.comments }); // Send only the comments array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





