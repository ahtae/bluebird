import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_AUTHENTICATED_USER,
  LOADING_USER,
} from '../actionTypes/user';

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});

export const setUnauthenticated = () => ({
  type: SET_UNAUTHENTICATED,
});

export const setAuthenticatedUser = (user) => ({
  type: SET_AUTHENTICATED_USER,
  payload: user,
});

export const loadingUser = () => ({
  type: LOADING_USER,
});
