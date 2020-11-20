const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      minlength: 6,
      maxLength: 30,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxLength: 30,
      required: true,
    },
    bio: String,
    website: String,
    location: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

UserSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
