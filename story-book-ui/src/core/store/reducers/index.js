import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import admin from './admin';

const rootReducer = (customReducers, history) =>
  combineReducers({
    admin,
    router: connectRouter(history),
    ...customReducers,
  });

export default rootReducer;
