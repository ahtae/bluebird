const express = require('express');
const User = require('../models/user');
const getTokenFrom = require('../utils/getTokenFrom');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const upload = require('../utils/multerConfig');
const cloudinary = require('../utils/cloudinaryConfig');
const cleanUserDetails = require('../utils/cleanUserDetails');

const userRouter = express.Router();

userRouter.get('/:userHandle', getTokenFrom, async (req, res) => {
  try {
    const { userHandle } = req.params;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'Unauthorized!' });
    } else {
      const user = await User.findOne({ handle: userHandle });

      if (user) {
        await user.populate('posts').sort('-createdAt').execPopulate();

        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User does not exist!' });
      }
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

userRouter.post(
  '/image',
  getTokenFrom,
  upload.single('image'),
  async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

      if (!req.token || !decodedToken.id) {
        return res.status(401).json({
          error: 'Unauthorized!',
        });
      } else {
        const user = await User.findById(decodedToken.id);

        if (user) {
          const image = req.file.path;
          const result = await cloudinary.uploader.upload(image);

          user.profilePicture = result.url;

          await user.save();

          res.status(200).json(user);
        } else {
          res.status(404).json({
            error: 'User does not exist!',
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        error: 'Something went wrong!',
      });
    }
  }
);

userRouter.put('/profile', getTokenFrom, async (req, res) => {
  try {
    const userDetails = cleanUserDetails(req.body);
    const { userId } = req.params;

    const user = await User.findById(userId);
    const keysOfUserDetails = Object.keys(userDetails);

    for (let i = 0; i < keysOfUserDetails.length; i++) {
      const key = keysOfUserDetails[i];

      user[key] = userDetails[key];
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong!',
    });
  }
});

module.exports = userRouter;
