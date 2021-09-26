import { THEME_TYPES } from '../constants';

const initialState = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'

const themeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === THEME_TYPES.CHANGE_THEME) {
    return payload;
  }
  return state;
};

export default themeReducer;