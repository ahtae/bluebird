const Validator = require('validator');
const validText = require('../validation/validText');

const cleanUserDetails = (data) => {
  data.bio = validText(data.bio) ? data.bio : '';
  data.website = validText(data.website) ? data.website : '';
  data.location = validText(data.location) ? data.location : '';

  const userDetails = {};

  if (!Validator.isEmpty(data.bio)) {
    userDetails.bio = data.bio;
  }

  if (!Validator.isEmpty(data.website)) {
    if (data.website.substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website}`;
    } else {
      userDetails.website = data.website;
    }
  }

  if (!Validator.isEmpty(data.location)) {
    userDetails.location = data.location;
  }

  return userDetails;
};

module.exports = cleanUserDetails;
