import { combineReducers } from 'redux';
// reducers
import homeReducer from './homeReducer';
import localeReducer from './localeReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  locale: localeReducer,
  theme: themeReducer
});

export default rootReducer;