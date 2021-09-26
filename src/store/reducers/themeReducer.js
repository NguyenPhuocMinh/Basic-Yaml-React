import { THEME_TYPES } from '../constants';

const themeReducer = (state = 'light', action) => {
  const { type, payload } = action;

  if (type === THEME_TYPES.CHANGE_THEME) {
    return payload;
  }
  return state;
};

export default themeReducer;