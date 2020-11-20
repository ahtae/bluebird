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
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw0_oEK4oat8ib811DHDOM-v&ust=1605839857463000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjQveTJje0CFQAAAAAdAAAAABAD',
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
