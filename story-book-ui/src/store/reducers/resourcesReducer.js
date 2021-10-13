import { RESOURCE_TYPES } from '../constants';

const initialState = {};

const resourceReducer = (state = initialState, action) => {
  if (action.type === RESOURCE_TYPES.REGISTER_RESOURCE) {
    const resourceState = {
      props: action.payload,
    };
    return {
      ...state,
      [action.payload.name]: resourceState,
    };
  }

  if (action.type === RESOURCE_TYPES.UNREGISTER_RESOURCE) {
    return Object.keys(state).reduce((acc, key) => {
      if (key === action.payload) {
        return acc;
      }

      return { ...acc, [key]: state[key] };
    }, {});
  }

  return state;
};

export default resourceReducer;