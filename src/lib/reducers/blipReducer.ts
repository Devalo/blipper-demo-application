import blipService from '../services/blipService';

const blipReducer = (state = [], action: any) => {
  switch (action.type) {
    case 'INIT_BLIPS':
      return action.data;
    case 'ADD_BLIP':
      return [action.data, ...state];
    case 'GET_USER_BLIPS':
      return action.data;
    case 'ADD_COMMENT': {
      // HVIS OBJECTS ER EMPTY, RETURNER UTEN OBJECT ASSIGN?
      const blip: any = state.find((b: any) => b.id === action.blipId);
      Object.assign(blip.comments, action.data.comments);

      return state.map((b: any) => (b.id !== blip.id ? b : blip));
    }
    default:
      return state;
  }
};

export const initializeBlips = () => {
  return async (dispatch) => {
    const data = await blipService.getAllBlips();
    dispatch({
      type: 'INIT_BLIPS',
      data,
    });
  };
};

export const addBlip = (blip: { text: string }) => {
  return async (dispatch) => {
    const data = await blipService.addBlip(blip);
    dispatch({
      type: 'ADD_BLIP',
      data,
    });
  };
};

export const getUserBlips = (userId) => {
  return async (dispatch) => {
    const data = await blipService.testGetUserBlips(userId);
    dispatch({
      type: 'GET_USER_BLIPS',
      data,
    });
  };
};

export const createComment = (blipId, commentData) => {
  return async (dispatch) => {
    const data = await blipService.createComment(blipId, commentData);

    dispatch({
      type: 'ADD_COMMENT',
      data,
      blipId,
    });
  };
};

export default blipReducer;
