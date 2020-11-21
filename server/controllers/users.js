const express = require('express');
const User = require('../models/user');
const getTokenFrom = require('../utils/getTokenFrom');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const usersRouter = express.Router();

usersRouter.get('/', getTokenFrom, async (req, res) => {
  try {
    const users = await User.find({});
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong!',
    });
  }
});

usersRouter.get('/:userId', getTokenFrom, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      if (user) {
        await user.populate('posts').execPopulate();

        res.json(user);
      } else {
        res.status(404).json({
          error: 'User does not exist!',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong!',
    });
  }
});

module.exports = usersRouter;
