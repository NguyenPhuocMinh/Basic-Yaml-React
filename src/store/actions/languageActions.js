import { LANGUAGE_TYPES } from '../constants';

const changeLanguages = (language) => dispatch => {
  dispatch({
    type: LANGUAGE_TYPES.CHANGE_LANGUAGE,
    payload: language
  })
}

const languageActions = {
  changeLanguages
};

export default languageActions;