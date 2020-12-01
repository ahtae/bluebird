import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  CREATE_POST,
  CREATE_COMMENT,
  DELETE_POST,
  GET_USER,
  GET_POST,
  DELETE_COMMENT,
  UNLIKE_COMMENT,
  LIKE_COMMENT,
  UPDATE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFORMATION,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from '../actionTypes/data';
import produce from 'immer';

const initialState = {
  posts: [],
  user: {},
  post: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_USER:
      return produce(state, (draft) => {
        if (draft.user.handle === action.payload.handle) {
          draft.user = action.payload;
        }
      });
    case UNFOLLOW_USER:
      return produce(state, (draft) => {
        if (draft.user.handle === action.payload.handle) {
          draft.user = action.payload;
        }
      });
    case UPDATE_PROFILE_INFORMATION:
      return produce(state, (draft) => {
        draft.user = action.payload;
      });
    case UPDATE_PROFILE_PICTURE:
      return produce(state, (draft) => {
        draft.posts = draft.posts.map((post) =>
          post.userHandle === action.payload.handle
            ? { ...post, userImage: action.payload.profilePicture }
            : post
        );

        if (draft.user.id === action.payload.id) {
          draft.user.profilePicture = action.payload.profilePicture;
        }

        if (draft.post.userHandle === action.payload.handle) {
          draft.post.userImage = action.payload.profilePicture;

          draft.post.comments = draft.post.comments.map((comment) =>
            comment.userHandle === action.payload.handle
              ? { ...comment, userImage: action.payload.profilePicture }
              : comment
          );
        }
      });
    case GET_POSTS:
      return produce(state, (draft) => {
        draft.posts = action.payload;
      });
    case CREATE_POST:
      return produce(state, (draft) => {
        draft.posts.unshift(action.payload);

        if (draft.user.handle === action.payload.userHandle) {
          draft.user.posts.unshift(action.payload);
        }
      });
    case GET_USER:
      return produce(state, (draft) => {
        draft.user = action.payload;
      });
    case LIKE_POST:
      return produce(state, (draft) => {
        if (Object.keys(draft.user).length) {
          draft.user.posts = draft.user.posts.map((post) =>
            post.id === action.payload.id
              ? { ...post, ...action.payload }
              : post
          );
        }

        if (Object.keys(draft.post).length) {
          draft.post = action.payload;
        }

        draft.posts = draft.posts.map((post) =>
          post.id === action.payload.id ? { ...post, ...action.payload } : post
        );
      });
    case UNLIKE_POST:
      return produce(state, (draft) => {
        if (Object.keys(draft.user).length) {
          draft.user.posts = draft.user.posts.map((post) =>
            post.id === action.payload.id
              ? { ...post, ...action.payload }
              : post
          );
        }

        if (Object.keys(draft.post).length) {
          draft.post = { ...draft.post, ...action.payload };
        }

        draft.posts = draft.posts.map((post) =>
          post.id === action.payload.id
            ? { ...draft.post, ...action.payload }
            : post
        );
      });
    case DELETE_POST:
      return produce(state, (draft) => {
        draft.posts = draft.posts.filter(
          (post) => post.id !== action.payload.postId
        );

        if (draft.post.id === action.payload.postId) {
          draft.post = {};
        }
      });
    case GET_POST:
      return produce(state, (draft) => {
        draft.post = action.payload;
      });
    case CREATE_COMMENT:
      return produce(state, (draft) => {
        if (draft.post.id === action.payload.postId) {
          draft.post.comments.push(action.payload);
        }
        draft.posts = draft.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.id] }
            : post
        );
      });
    case DELETE_COMMENT:
      return produce(state, (draft) => {
        draft.posts = draft.posts.map((post) => {
          if (post.id === action.payload.postId) {
            post.comments = post.comments.filter(
              (comment) => comment !== action.payload.commentId
            );
          }

          return post;
        });

        if (draft.post.id === action.payload.postId) {
          draft.post.comments = draft.post.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          );
        }
      });
    case UNLIKE_COMMENT:
      return produce(state, (draft) => {
        if (draft.post.id === action.payload.postId) {
          draft.post.comments = draft.post.comments.map((comment) =>
            comment.id !== action.payload.id
              ? comment
              : { ...comment, ...action.payload }
          );
        }
      });
    case LIKE_COMMENT:
      return produce(state, (draft) => {
        if (draft.post.id === action.payload.postId) {
          draft.post.comments = draft.post.comments.map((comment) =>
            comment.id !== action.payload.id
              ? comment
              : { ...comment, ...action.payload }
          );
        }
      });
    default:
      return state;
  }
};

export default dataReducer;
