const Validator = require('validator');
const validText = require('./validText');

const validateRegistrationInput = (data) => {
  const errors = {};

  data.handle = validText(data.handle) ? data.handle : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.confirmPassword = validText(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required!';
  } else {
    if (data.handle.length < 6 || data.handle.length > 30) {
      errors.handle = 'The handle must be between 6 and 30 in length!';
    }
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required!';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required!';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required!';
  }

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword =
      'Password field and confirm password field must be the same!';
  } else {
    if (data.password.length < 6 || data.password.length > 30) {
      errors.password = 'The password must be between 6 and 30 in length!';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateRegistrationInput;
