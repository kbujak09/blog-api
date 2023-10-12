const express = require('express');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');
const passport = require('passport')
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/posts', postsController.posts_list);

router.post('/posts', postsController.posts_create);

router.get('/posts/:id', postsController.post_get);

router.put('/posts/:id', passport.authenticate('jwt', {session: false}), postsController.post_likes_add);

router.delete('/posts/:id', passport.authenticate('jwt', {session: false}), postsController.post_likes_delete);

router.post('/comments', passport.authenticate('jwt', {session: false}), commentsController.comments_create);

router.get('/comments', commentsController.comments_list);

module.exports = router;
