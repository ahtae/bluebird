const Validator = require('validator');
const validText = require('./validText');

const validateProfile = (data) => {
  const errors = {};

  data.website = validText(data.website) ? data.website : '';

  if (Validator.isURL(data.website)) {
    errors.website = 'This is not a valid website!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateProfile;
