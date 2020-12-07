const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    userHandler: String,
    postId: String,
    isRead: { type: Boolean, default: false },
    message: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

NotificationSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
