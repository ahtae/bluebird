const express = require('express');
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/getTokenFrom');
const config = require('../utils/config');
const upload = require('../utils/multerConfig');
const cloudinary = require('../utils/cloudinaryConfig');
const cleanUserDetails = require('../utils/cleanUserDetails');
const validateProfile = require('../../server/validation/validateProfile');
const { User, Post, Comment, Follower } = require('../models');

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
        await user
          .populate('posts')
          .populate({
            path: 'followers',
            populate: {
              path: 'user',
              model: 'User',
            },
          })
          .populate({
            path: 'notifications',
            options: { sort: { _id: -1 } },
          })
          .execPopulate();

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
  upload.single('image'),
  getTokenFrom,
  async (req, res) => {
    try {
      const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

      if (!req.token || !decodedToken.id) {
        return res.status(401).json({
          error: 'Unauthorized!',
        });
      } else {
        const user = await User.findById(decodedToken.id)
          .populate('posts')
          .populate({
            path: 'followers',
            populate: {
              path: 'user',
              model: 'User',
            },
          })
          .populate('notifications');

        const posts = await Post.find({ userHandle: user.handle });
        const comments = await Comment.find({ userHandle: user.handle });

        if (user) {
          const image = req.file.path;
          const result = await cloudinary.uploader.upload(image);

          user.profilePicture = result.url;

          for (let i = 0; i < posts.length; i++) {
            const currentPost = posts[i];

            if (currentPost.userHandle === user.handle) {
              currentPost.userImage = result.url;
            }

            await currentPost.save();
          }

          for (let i = 0; i < comments.length; i++) {
            const currentComment = comments[i];

            if (currentComment.userHandle === user.handle) {
              currentComment.userImage = result.url;
            }

            await currentComment.save();
          }

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
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userDetails = cleanUserDetails(req.body);
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const userId = decodedToken.id;
      const user = await User.findById(userId);
      const keysOfUserDetails = Object.keys(userDetails);

      if (user) {
        await user
          .populate('posts')
          .populate('followers')
          .populate('notifications')
          .execPopulate();

        for (let i = 0; i < keysOfUserDetails.length; i++) {
          const key = keysOfUserDetails[i];

          user[key] = userDetails[key];
        }

        await user.save();

        res.status(200).json(user);
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

userRouter.post('/follow', getTokenFrom, async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const { handle } = req.body;
      const idOfUser = decodedToken.id;
      const user = await User.findOne({ handle });
      const follower = await Follower.create({ user: idOfUser });

      if (user) {
        user.followers.push(follower._id);

        await user.save();
        await user
          .populate('posts')
          .populate({
            path: 'followers',
            populate: {
              path: 'user',
              model: 'User',
            },
          })
          .populate('notifications')
          .execPopulate();

        res.status(200).json(user);
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

userRouter.post('/unfollow', getTokenFrom, async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const { handle } = req.body;
      const idOfUser = decodedToken.id;
      const userFollowing = await User.findById(idOfUser);
      const user = await User.findOne({ handle })
        .populate('posts')
        .populate({
          path: 'followers',
          populate: {
            path: 'user',
            model: 'User',
          },
        })
        .populate('notifications');

      if (user) {
        user.followers = user.followers.filter(
          (follower) => follower.user.handle !== userFollowing.handle
        );

        await user.save();

        res.status(200).json(user);
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

module.exports = userRouter;
