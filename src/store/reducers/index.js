import { combineReducers } from 'redux';
// reducers
import adminReducer from './adminReducer';
import homeReducer from './homeReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  admin: adminReducer,
  home: homeReducer,
  theme: themeReducer
});

export default rootReducer;