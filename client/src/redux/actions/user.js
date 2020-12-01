import {
  loadingUI,
  setErrors,
  clearErrors,
  notLoadingUI,
} from '../actionCreators/ui';
import {
  setAuthenticated,
  setUnauthenticated,
  setAuthenticatedUser,
} from '../actionCreators/user';
import {
  updateProfilePicture,
  updateProfileInformation,
  getUser,
} from '../actionCreators/data';
import authService from '../../services/authService';
import userService from '../../services/userService';

export const loginUser = (credentials, history) => async (dispatch) => {
  dispatch(loadingUI());

  try {
    const response = await authService.login(credentials);
    const { token, userHandle } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userHandle', userHandle);

    dispatch(setAuthenticatedUserInformation(userHandle));
    dispatch(setAuthenticated());
    dispatch(clearErrors());

    history.push('/dashboard');
  } catch (error) {
    const { response } = error;

    const errors = response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const signupUser = (credentials, history) => async (dispatch) => {
  dispatch(loadingUI());

  try {
    const response = await authService.signUp(credentials);
    const { token, userHandle } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userHandle', userHandle);

    dispatch(setAuthenticatedUserInformation(userHandle));
    dispatch(setAuthenticated());
    dispatch(clearErrors());

    history.push('/dashboard');
  } catch (error) {
    const { response } = error;
    const errors = response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const logOutUser = (history) => async (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userHandle');

  dispatch(setUnauthenticated());
  history.push('/');
};

// export const getAuthenticatedUserInformation = (userId) => async (dispatch) => {
//   dispatch(loadingUI());

//   try {
//     const user = await usersService.getUser(userId, config);

//     // dispatch(getAuthenticatedUser(user));
//     dispatch(setUser(user));
//   } catch (error) {
//     const errors = error.response.data;

//     dispatch(setErrors(errors));
//   }

//   dispatch(notLoadingUI());
// };

export const uploadProfilePicture = (formData) => async (dispatch) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.uploadImage(formData, config);
    const user = response.data;

    dispatch(setAuthenticatedUser(user));
    dispatch(getUser(user));
    dispatch(updateProfilePicture(user));
  } catch (error) {
    const { response } = error;
    const errors = response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const updateUserProfileInformation = (profileData) => async (
  dispatch
) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.updateProfile(profileData, config);
    const user = response.data;

    dispatch(setAuthenticatedUser(user));
    dispatch(getUser(user));
    dispatch(updateProfileInformation(user));
  } catch (error) {
    const { response } = error;
    const errors = response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};

export const setAuthenticatedUserInformation = (userHandle) => async (
  dispatch
) => {
  dispatch(loadingUI());

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await userService.getUser(userHandle, config);
    const user = response.data;

    dispatch(setAuthenticatedUser(user));
  } catch (error) {
    const { response } = error;
    const errors = response.data;

    dispatch(setErrors(errors));
  }

  dispatch(notLoadingUI());
};
