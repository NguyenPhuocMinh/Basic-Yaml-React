import { LOCALE_TYPES } from '../constants';

const changeLanguages = (language) => async dispatch => {
  dispatch({
    type: LOCALE_TYPES.CHANGE_LANGUAGE,
    payload: language
  })
}

const localeActions = {
  changeLanguages
};

export default localeActions;