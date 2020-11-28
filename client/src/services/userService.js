import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/user';

const getUser = async (userHandle, config) => {
  const response = await axios.get(`${baseUrl}/${userHandle}`, config);

  return response;
};

const uploadImage = async (formData, config) => {
  const response = await axios.post(`${baseUrl}/image`, formData, config);

  return response;
};

const updateProfile = async (profileData, config) => {
  const response = await axios.put(`${baseUrl}/profile`, profileData, config);

  return response;
};

const userService = { getUser, uploadImage, updateProfile };

export default userService;