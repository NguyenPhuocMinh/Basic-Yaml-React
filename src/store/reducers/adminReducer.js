import { ADMIN_TYPES } from '../constants';

const initialState = {
  ui: {
    sidebarIsOpen: false,
  }
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_TYPES.CHANGE_SIDE_BAR:
      return {
        ...state,
        ui: {
          sidebarIsOpen: payload
        }
      }
    default:
      return state
  }
};

export default adminReducer;