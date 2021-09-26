import { combineReducers } from 'redux';
// reducers
import homeReducer from './homeReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  theme: themeReducer
});

export default rootReducer;