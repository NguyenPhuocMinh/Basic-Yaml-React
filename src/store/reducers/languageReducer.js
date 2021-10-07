import { LANGUAGE_TYPES } from '../constants';

const initialState = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

const languageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === LANGUAGE_TYPES.CHANGE_LANGUAGE) {
    return payload;
  }
  if (type === LANGUAGE_TYPES.CHANGE_SELECTED) {
    return payload
  }
  return state;
};

export default languageReducer;