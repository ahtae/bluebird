const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    userHandle: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    dislikes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    userImage: {
      type: String,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

PostSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
