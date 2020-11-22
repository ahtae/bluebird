import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/posts';

const getPosts = async (credentials) => {
  const response = await axios.get(`${baseUrl}/`, credentials);

  return response;
};

const createPost = async (post, credentials) => {
  const response = await axios.post(`${baseUrl}/`, post, credentials);

  return response;
};

const postService = { getPosts, createPost };

export default postService;
