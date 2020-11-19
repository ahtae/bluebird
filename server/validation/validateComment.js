const Validator = require('validator');
const validText = require('./validText');

const validateComment = (data) => {
  const errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.body = 'You cannot submit an empty comment!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateComment;
