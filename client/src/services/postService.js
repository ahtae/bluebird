import axios from 'axios';

const baseUrl = '/api/posts';

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

const likeComment = async (postId, commentId, credentials) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comments/${commentId}/like`,
    {},
    credentials
  );

  return response;
};

const unlikeComment = async (postId, commentId, credentials) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comments/${commentId}/unlike`,
    {},
    credentials
  );

  return response;
};

const deletePost = async (postId, credentials) => {
  const response = await axios.delete(`${baseUrl}/${postId}`, credentials);

  return response;
};

const getPost = async (postId, credentials) => {
  const response = await axios.get(`${baseUrl}/${postId}`, credentials);

  return response;
};

const createComment = async (postId, comment, credentials) => {
  const response = await axios.post(
    `${baseUrl}/${postId}/comments`,
    comment,
    credentials
  );

  return response;
};

const deleteComment = async (postId, commentId, credentials) => {
  const response = await axios.delete(
    `${baseUrl}/${postId}/comments/${commentId}`,
    credentials
  );

  return response;
};

const postService = {
  deleteComment,
  createComment,
  getPost,
  getPosts,
  createPost,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
  deletePost,
};

export default postService;
