import { CHANGE_THEME } from '../customTypes';

export const changeTheme = theme => ({
  type: CHANGE_THEME,
  payload: theme
});
