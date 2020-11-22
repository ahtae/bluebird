import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/auth';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  return response;
};

const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}/signup`, credentials);

  return response;
};

const authService = { login, signup };

export default authService;
