import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  NOT_LOADING_UI,
} from '../actionTypes/ui';

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const loadingUI = () => ({
  type: LOADING_UI,
});

export const notLoadingUI = () => ({
  type: NOT_LOADING_UI,
});
