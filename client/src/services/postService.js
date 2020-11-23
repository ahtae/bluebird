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

const likePost = async (postId, credentials) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/like`,
    {},
    credentials
  );

  return response;
};

const unlikePost = async (postId, credentials) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/unlike`,
    {},
    credentials
  );

  return response;
};

const deletePost = async (postId, credentials) => {
  const response = await axios.delete(`${baseUrl}/${postId}`, credentials);

  return response;
};

const postService = { getPosts, createPost, likePost, unlikePost, deletePost };

export default postService;
