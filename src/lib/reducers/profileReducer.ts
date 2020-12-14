import profileService from '../services/profileService';

const profileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE':
      return action.data;
    case 'UPDATE_PROFILE':
      console.log(action.data);
      console.log(state);
      return action.data;
    default:
      return state;
  }
};

export const getMyProfile = (userId) => {
  return async (dispatch) => {
    const data = await profileService.getUserData(userId);
    dispatch({
      type: 'GET_USER_PROFILE',
      data,
    });
  };
};

export const editProfile = (userData, user, tempFile, myProfile) => {
  return async (dispatch) => {
    const data = await profileService.updateProfile(userData, user, tempFile, myProfile);
    dispatch({
      type: 'UPDATE_PROFILE',
      data,
    });
  };
};

export default profileReducer;
