import {
  SET_ERRORS,
  LOADING_UI,
  CLEAR_ERRORS,
  NOT_LOADING_UI,
} from '../actionTypes/ui';

const initialState = {
  loading: false,
  errors: {},
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case NOT_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

export default uiReducer;
