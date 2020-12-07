import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED_USER,
} from '../actionTypes/user';
import {
  DELETE_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
  READ_NOTIFICATION,
} from '../actionTypes/data';
import produce from 'immer';

const initialState = {
  authenticated: false,
  credentials: { notifications: [] },
  likes: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_NOTIFICATION:
      return produce(state, (draft) => {
        draft.credentials.notifications = draft.credentials.notifications.map(
          (notification) =>
            action.payload.id === notification.id
              ? action.payload
              : notification
        );
      });
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_AUTHENTICATED_USER:
      return produce(state, (draft) => {
        draft.credentials = action.payload;
      });
    case LIKE_POST:
      return produce(state, (draft) => {
        draft.likes.push(action.payload.id);
      });
    case UNLIKE_POST:
      return produce(state, (draft) => {
        draft.likes = draft.likes.filter(
          (post) => post.id !== action.payload.id
        );
      });
    case DELETE_COMMENT:
      return produce(state, (draft) => {
        draft.credentials.posts = draft.credentials.posts.map((post) => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: {
                ...post.comments.filter(
                  (comment) => comment.id !== action.payload.commentId
                ),
              },
            };
          }

          return post;
        });
      });
    default:
      return state;
  }
};

export default userReducer;
