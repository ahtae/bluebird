const Validator = require('validator');
const validText = require('./validText');

const validateProfile = (data) => {
  const errors = {};

  data.website = validText(data.website) ? data.website : '';

  if (Validator.isUrl(data.website)) {
    errors.error = 'This is not a valid website!';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = validateProfile;
