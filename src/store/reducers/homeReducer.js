import { HOME_TYPES } from '../constants';

const initialState = {
  
}

const homeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HOME_TYPES.HOME_REQUEST:
      return {
        ...state,
        loading: true
      }
    case HOME_TYPES.HOME_SUCCESS:
      return {
        ...state,
        
      }
    case HOME_TYPES.HOME_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
};

export default homeReducer;