const express = require('express');
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/getTokenFrom');
const validatePost = require('../validation/validatePost');
const validateComment = require('../validation/validateComment');
const config = require('../utils/config');
const { Post, Comment, User, Notification } = require('../models');

const postRouter = express.Router();

postRouter.get('/', getTokenFrom, async (req, res) => {
  try {
    const posts = await Post.find({}).sort('-createdAt');
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

postRouter.post('/', getTokenFrom, async (req, res) => {
  const { errors, isValid } = validatePost(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { body } = req.body;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const user = await User.findById(decodedToken.id).populate({
        path: 'followers',
        populate: {
          path: 'user',
          model: 'User',
        },
      });

      if (user) {
        const post = {
          userHandle: user.handle,
          body,
          userImage: user.profilePicture,
        };

        const createdPost = await Post.create(post);

        user.posts = user.posts.concat(createdPost._id);

        await user.save();

        const newNotification = {
          userHandle: user.handle,
          postId: createdPost._id,
          message: `${user.handle} has made a new post.`,
        };

        for (const follower of user.followers) {
          const userToUpdate = await User.findById(follower.user._id);
          const notification = await Notification.create(newNotification);

          userToUpdate.notifications.push(notification._id);

          await userToUpdate.save();
        }

        res.status(201).json(createdPost);
      } else {
        res.json(404).json({ error: 'User not found!' });
      }
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

postRouter.get('/:postId', getTokenFrom, async (req, res) => {
  try {
    const { token } = req;
    const { postId } = req.params;
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const post = await Post.findById(postId).populate('comments');

      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Post not found!' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

postRouter.delete('/:postId', getTokenFrom, async (req, res) => {
  const { postId } = req.params;
  const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({
      error: 'Unauthorized!',
    });
  } else {
    try {
      const user = await User.findById(decodedToken.id);

      if (user) {
        user.posts = user.posts.filter((post) => post.id !== postId);

        await user.save();

        await Comment.deleteMany({ postId: postId });
        await Post.deleteOne({ _id: postId });

        res.status(200).json({ message: 'Successfully deleted!' });
      } else {
        res.json(404).json({ error: 'User not found!' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
});

postRouter.post('/:postId/like', getTokenFrom, async (req, res) => {
  try {
    const { postId } = req.params;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      if (decodedToken) {
        const userId = decodedToken.id;
        const user = await User.findById(userId);
        const post = await Post.findById(postId).populate('comments');

        post.likes.push(userId);
        post.likeCount += 1;

        const ownerOfPost = await User.findOne({ handle: post.userHandle });

        const newNotification = {
          userHandle: ownerOfPost.handle,
          postId: post._id,
          message: `${user.handle} has liked your post.`,
        };

        const notification = await Notification.create(newNotification);

        ownerOfPost.notifications.push(notification._id);

        await ownerOfPost.save();
        await post.save();

        res.status(200).json(post);
      } else {
        res.status(404).json('User does not exist!');
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

postRouter.post('/:postId/unlike', getTokenFrom, async (req, res) => {
  try {
    const { postId } = req.params;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      if (decodedToken) {
        const userId = decodedToken.id;
        const post = await Post.findById(postId).populate('comments');

        post.likes = post.likes.filter((user) => user._id === userId);
        post.likeCount -= 1;

        await post.save();

        res.status(200).json(post);
      } else {
        res.status(404).json('User does not exist!');
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

postRouter.post('/:postId/comments', getTokenFrom, async (req, res) => {
  const { errors, isValid } = validateComment(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const { postId } = req.params;
    const { body } = req.body;
    const { token } = req;
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (decodedToken) {
      const post = await Post.findById(postId);
      const postCreator = await User.findOne({ handle: post.userHandle });

      const createdComment = await Comment.create({
        userHandle: decodedToken.handle,
        content: body,
        postId,
        userImage: user.profilePicture,
      });

      const newNotification = {
        userHandle: post.userHandle,
        postId: post._id,
        message: `${user.handle} has commented on your post.`,
      };

      const notification = await Notification.create(newNotification);

      postCreator.notifications.push(notification._id);

      post.comments = [createdComment._id, ...post.comments];

      await postCreator.save();
      await post.save();

      res.status(201).json(createdComment);
    } else {
      res.status(404).json('User does not exist!');
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

postRouter.delete(
  '/:postId/comments/:commentId',
  getTokenFrom,
  async (req, res) => {
    const { commentId, postId } = req.params;
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      try {
        const user = await User.findById(decodedToken.id);

        if (user) {
          await Comment.deleteOne({ id: commentId });
          const post = await Post.findById(postId);

          post.comments = post.comments.filter(
            (comment) => comment._id === commentId
          );

          await post.save();

          res.status(200).json({ message: 'Successfully deleted!' });
        } else {
          res.json(404).json({ error: 'User not found!' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
      }
    }
  }
);

postRouter.post(
  '/:postId/comments/:commentId/like',
  getTokenFrom,
  async (req, res) => {
    try {
      const { commentId } = req.params;
      const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

      if (!req.token || !decodedToken.id) {
        return res.status(401).json({
          error: 'Unauthorized!',
        });
      } else {
        if (decodedToken) {
          const userId = decodedToken.id;
          const user = await User.findById(userId);
          const comment = await Comment.findById(commentId);
          const ownerOfComment = await User.findOne({
            handle: comment.userHandle,
          });

          comment.likes.push(userId);
          comment.likeCount += 1;

          const newNotification = {
            userHandle: ownerOfComment.handle,
            postId: comment.postId,
            message: `${user.handle} has liked your comment.`,
          };

          const notification = await Notification.create(newNotification);

          ownerOfComment.notifications.push(notification._id);

          await ownerOfComment.save();
          await comment.save();

          res.status(200).json(comment);
        } else {
          res.status(404).json('User does not exist!');
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
);

postRouter.post(
  '/:postId/comments/:commentId/unlike',
  getTokenFrom,
  async (req, res) => {
    try {
      const { commentId } = req.params;
      const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

      if (!req.token || !decodedToken.id) {
        return res.status(401).json({
          error: 'Unauthorized!',
        });
      } else {
        if (decodedToken) {
          const userId = decodedToken.id;
          const comment = await Comment.findById(commentId);

          comment.likes = comment.likes.filter(
            (user) => String(user._id) !== String(userId)
          );
          comment.likeCount -= 1;

          await comment.save();

          res.status(200).json(comment);
        } else {
          res.status(404).json('User does not exist!');
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
);

module.exports = postRouter;
