import axios from 'axios';

const baseUrl = '/api/auth';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  return response;
};

const signUp = async (credentials) => {
  const response = await axios.post(`${baseUrl}/signup`, credentials);

  return response;
};

const authService = { login, signUp };

export default authService;
