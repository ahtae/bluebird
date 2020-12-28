import axios from 'axios';

const baseUrl = '/api/notifications';

const getNotifications = async (credentials) => {
  const response = await axios.get(`${baseUrl}`, credentials);

  return response;
};

const getNotification = async (notificationId, credentials) => {
  const response = await axios.get(`${baseUrl}/${notificationId}`, credentials);

  return response;
};

const notificationService = {
  getNotifications,
  getNotification,
};

export default notificationService;
