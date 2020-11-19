const Validator = require('validator');
const validText = require('./validText');

const validatePost = (data) => {
  const errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.handle = 'You cannot submit an empty post!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validatePost;
