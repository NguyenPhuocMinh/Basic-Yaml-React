import {
  CHANGE_SIDE_BAR,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  RESET_NOTIFICATION
} from '../../actions';

const initialState = {
  sidebarIsOpen: true,
  notification: {}
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SIDE_BAR:
      return {
        ...state,
        sidebarIsOpen: payload
      };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: payload
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: {}
      };
    case RESET_NOTIFICATION: {
      return {
        ...state,
        notification: {}
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
