import { loadingUI, setErrors, notLoadingUI } from '../actionCreators/ui';
import {
  getUser,
  getPosts,
  getPost,
  likePost,
  unlikePost,
  createPost,
  createComment,
  deleteComment,
  deletePost,
  unlikeComment,
  likeComment,
  followUser,
  unfollowUser,
} from '../actionCreators/data';
import postService from '../../services/postService';
import userService from '../../services/userService';

export const getAllPosts = () => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.getPosts(config);
    const posts = response.data;

    dispatch(getPosts(posts));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const getSinglePost = (postId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.getPost(postId, config);
    const post = response.data;

    dispatch(getPost(post));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const createAPost = (post) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.createPost(post, config);
    const createdPost = response.data;

    dispatch(createPost(createdPost));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const getUserInformation = (userHandle) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.getUser(userHandle, config);
    const user = response.data;

    dispatch(getUser(user));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const likeAPost = (postId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.likePost(postId, config);
    const post = response.data;

    dispatch(likePost(post));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const createAComment = (postId, comment) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.createComment(postId, comment, config);
    const createdComment = response.data;

    dispatch(createComment(createdComment));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const unlikeAPost = (postId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.unlikePost(postId, config);
    const post = response.data;

    dispatch(unlikePost(post));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const deleteAPost = (postId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    await postService.deletePost(postId, config);

    dispatch(deletePost(postId));
  } catch (error) {
    const errors = error.response;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const deleteAComment = (postId, commentId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    await postService.deleteComment(postId, commentId, config);

    dispatch(deleteComment(postId, commentId));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const likeAComment = (postId, commentId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.likeComment(postId, commentId, config);

    const updatedComment = response.data;

    dispatch(likeComment(updatedComment));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const unlikeAComment = (postId, commentId) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await postService.unlikeComment(postId, commentId, config);

    const updatedComment = response.data;

    dispatch(unlikeComment(updatedComment));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const followAUser = (userHandler) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.followUser(userHandler, config);
    const user = response.data;

    dispatch(followUser(user));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const unfollowAUser = (userHandler) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.unfollowUser(userHandler, config);
    const user = response.data;

    dispatch(unfollowUser(user));
  } catch (error) {
    const errors = error.response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};
