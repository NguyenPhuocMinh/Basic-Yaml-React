import { combineReducers } from 'redux';
// reducers
import adminReducer from './adminReducer';
import homeReducer from './homeReducer';
import themeReducer from './themeReducer';
import languageReducer from './languageReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  home: homeReducer,
  theme: themeReducer,
  language: languageReducer
});

export default rootReducer;