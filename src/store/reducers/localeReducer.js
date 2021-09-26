import { LOCALE_TYPES } from '../constants';
import i18n from '../../i18n';

const initialState = {
  locale: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en'
}

const localeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === LOCALE_TYPES.CHANGE_LANGUAGE) {
    i18n.changeLanguage(payload);
    return {
      ...state,
      locale: payload
    };
  }
  return state;
};

export default localeReducer;