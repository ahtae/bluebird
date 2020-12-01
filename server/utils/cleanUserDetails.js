const Validator = require('validator');
const validText = require('../validation/validText');

const cleanUserDetails = (data) => {
  data.bio = validText(data.bio) ? data.bio : '';
  data.website = validText(data.website) ? data.website : '';
  data.location = validText(data.location) ? data.location : '';

  const userDetails = {
    bio: data.bio,
    website: data.website,
    location: data.location,
  };

  if (!Validator.isEmpty(data.website)) {
    if (data.website.substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website}`;
    } else {
      userDetails.website = data.website;
    }
  }

  return userDetails;
};

module.exports = cleanUserDetails;
