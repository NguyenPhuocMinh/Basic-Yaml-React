import { CHANGE_THEME } from '../customTypes';

const initialState = localStorage.getItem('theme')
  ? localStorage.getItem('theme')
  : 'light';

const themeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === CHANGE_THEME) {
    return payload;
  }
  return state;
};

export default themeReducer;
