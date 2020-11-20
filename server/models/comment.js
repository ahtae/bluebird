const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const CommentSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [ReplySchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

CommentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
