const express = require('express');
const Post = require('../models/posts');
const getTokenFrom = require('../utils/getTokenFrom');
const jwt = require('jsonwebtoken');

const postRouter = express.Router();

postRouter.get('/', getTokenFrom, async (req, res) => {
  try {
    const posts = await Post.find({}).sort('-createdAt');

    res.json(posts);
  } catch (error) {
    res.json({ error: 'Something went wrong!' });
  }
});

postRouter.post('/', getTokenFrom, async (req, res) => {
  try {
    const { body } = req.body;
    const { token } = req;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const createdPost = await Post.create({
      userHandle: decodedToken.handle,
      body,
    });

    res.status(201).json(createdPost);
  } catch (error) {
    res.json({ error: 'Something went wrong!' });
  }
});

module.exports = postRouter;
