import profileService from '../services/profileService';

const profileReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE':
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

export default profileReducer;
