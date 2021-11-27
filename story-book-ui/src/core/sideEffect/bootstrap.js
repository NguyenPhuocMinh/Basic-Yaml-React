import { all } from 'redux-saga/effects';
import auth from './auth';
// import redirection from './redirection';

/**
 * @param {Object} dataProvider A Data Provider function
 */
const bootstrapSaga = ( authProvider = null) => {
  return function* admin() {
    yield all([
      auth(authProvider)(),
      // redirection(),
    ]);
  };
}

export default bootstrapSaga;
