import usersService from '../services/usersService';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return action.data;
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const data = await usersService.getAllUsers();
    dispatch({
      type: 'GET_ALL_USERS',
      data,
    });
  };
};

export default usersReducer;
