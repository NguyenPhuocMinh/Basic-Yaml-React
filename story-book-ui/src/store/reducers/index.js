import { combineReducers } from 'redux';
// reducers
import adminReducer from './adminReducer';
import homeReducer from './homeReducer';
import themeReducer from './themeReducer';
import languageReducer from './languageReducer';
import resourceReducer from './resourcesReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  home: homeReducer,
  theme: themeReducer,
  language: languageReducer,
  resources: resourceReducer
});

export default rootReducer;