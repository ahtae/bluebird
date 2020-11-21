const express = require('express');
const User = require('../models/user');
const getTokenFrom = require('../utils/getTokenFrom');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

userRouter.get('/:userHandle', getTokenFrom, async (req, res) => {
  try {
    const { userHandle } = req.params;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'Unauthorized!' });
    } else {
      const user = await User.findOne({ handle: userHandle });

      if (user) {
        await user.populate('posts').execPopulate();

        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User does not exist!' });
      }
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

module.exports = userRouter;
