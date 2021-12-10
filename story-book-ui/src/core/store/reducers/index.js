import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import admin from './admin';

const rootReducer = (customReducers, history) =>
  combineReducers({
    admin,
    router: connectRouter(history),
    ...customReducers
  });

export default rootReducer;
