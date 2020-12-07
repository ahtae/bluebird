import {
  GET_USER,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_POST,
  CREATE_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  GET_POST,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFORMATION,
  READ_NOTIFICATION,
  GET_NOTIFICATIONS,
} from '../actionTypes/data';

export const readNotification = (notification) => ({
  type: READ_NOTIFICATION,
  payload: notification,
});

export const getNotifications = (notifications) => ({
  type: GET_NOTIFICATIONS,
  payload: notifications,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const getPosts = (posts) => ({
  type: GET_POSTS,
  payload: posts,
});

export const getPost = (post) => ({
  type: GET_POST,
  payload: post,
});

export const likePost = (post) => ({
  type: LIKE_POST,
  payload: post,
});

export const unlikePost = (post) => ({
  type: UNLIKE_POST,
  payload: post,
});

export const createPost = (post) => ({
  type: CREATE_POST,
  payload: post,
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: {
    postId,
  },
});

export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT,
  payload: {
    postId,
    commentId,
  },
});

export const updateProfilePicture = (user) => ({
  type: UPDATE_PROFILE_PICTURE,
  payload: user,
});

export const likeComment = (comment) => ({
  type: LIKE_COMMENT,
  payload: comment,
});

export const updateProfileInformation = (user) => ({
  type: UPDATE_PROFILE_INFORMATION,
  payload: user,
});

export const unlikeComment = (comment) => ({
  type: UNLIKE_COMMENT,
  payload: comment,
});

export const followUser = (user) => ({
  type: FOLLOW_USER,
  payload: user,
});

export const unfollowUser = (user) => ({
  type: UNFOLLOW_USER,
  payload: user,
});
