const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  handle: {
    type: String,
    minlength: 6,
    maxLength: 30,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
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
});

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
