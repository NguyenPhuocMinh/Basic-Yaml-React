import { CHANGE_LANGUAGE } from '../customTypes';

const initialState = localStorage.getItem('language')
  ? localStorage.getItem('language')
  : 'en';

const languageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === CHANGE_LANGUAGE) {
    return payload;
  }
  return state;
};

export default languageReducer;
