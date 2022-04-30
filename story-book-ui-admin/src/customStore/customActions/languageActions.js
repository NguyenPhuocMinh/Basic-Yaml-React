import { CHANGE_LANGUAGE } from '../customTypes';

export const changeLanguage = lng => ({
  type: CHANGE_LANGUAGE,
  payload: lng
});
