const express = require('express');
const jwt = require('jsonwebtoken');
const getTokenFrom = require('../utils/getTokenFrom');
const { Notification, User } = require('../models');
const config = require('../utils/config');

const notificationRouter = express.Router();

notificationRouter.get('/:notificationId', getTokenFrom, async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const { notificationId } = req.params;
      const notification = await Notification.findById(notificationId);

      notification.isRead = true;
      await notification.save();

      res.status(200).json(notification);
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

notificationRouter.get('/', getTokenFrom, async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, config.JWT_SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Unauthorized!',
      });
    } else {
      const user = await User.findById(decodedToken.id)
        .populate({
          path: 'notifications',
          options: { sort: { _id: -1 } },
        })
        .exec();

      if (user) {
        const notifications = user.notifications;

        res.json(200).json(notifications);
      } else {
        res.json(404).json({ error: 'User not found!' });
      }
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong!' });
  }
});

module.exports = notificationRouter;
