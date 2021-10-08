import { ADMIN_TYPES } from '../constants';

const initialState = {
  ui: {
    sidebarIsOpen: false,
    changeSelectedIndex: 0
  }
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_TYPES.CHANGE_SIDE_BAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarIsOpen: payload
        }
      }
    case ADMIN_TYPES.CHANGE_SELECTED_INDEX:
      return {
        ...state,
        ui: {
          ...state.ui,
          changeSelectedIndex: payload
        }
      }
    default:
      return state
  }
};

export default adminReducer;