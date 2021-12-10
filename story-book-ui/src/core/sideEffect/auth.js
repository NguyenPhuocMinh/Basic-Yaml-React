import { push, replace } from 'connected-react-router';
import {
  all,
  put,
  call,
  select,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import {
  showNotification,
  hideNotification,
  clearState
} from '../store/actions';
import { USER_TYPES, FETCH_TYPES } from '../store/constants';
import { getErrorMessage } from '../utils';

const authSaga = (authProvider) => {
  if (!authProvider) {
    return function () {
      return null;
    };
  }
  return function* watchAuthActions() {
    yield all([
      takeEvery(USER_TYPES.USER_LOGIN, handleRegister(authProvider)),
      takeEvery(USER_TYPES.USER_LOGIN, handleLogin(authProvider)),
      takeEvery(USER_TYPES.USER_CHECK, handleCheck(authProvider)),
      takeEvery(USER_TYPES.USER_LOGOUT, handleLogout(authProvider)),
      takeLatest(FETCH_TYPES.FETCH_ERROR, handleFetchError(authProvider))
    ]);
  };
};

export default authSaga;

const nextPathnameSelector = (state) => {
  const locationState = state.router.location.state;
  return locationState && locationState.nextPathname;
};

const currentPathnameSelector = (state) => state.router.location;

export const handleRegister = (authProvider) =>
  function* (action) {
    const { payload, meta } = action;
    try {
      yield put({ type: USER_TYPES.USER_LOGIN_LOADING });
      const authPayload = yield call([authProvider, 'register'], payload);
      yield put({
        type: USER_TYPES.USER_LOGIN_SUCCESS,
        payload: authPayload
      });
      const redirectTo = yield meta.pathName || select(nextPathnameSelector);
      yield put(push(redirectTo || '/'));
    } catch (e) {
      yield put({
        type: USER_TYPES.USER_LOGIN_FAILURE,
        error: e,
        meta: { auth: true }
      });
      const errorMessage = getErrorMessage(e, 'auth.sign_in_error');
      yield put(showNotification(errorMessage, 'warning'));
    }
  };

export const handleLogin = (authProvider) =>
  function* (action) {
    const { payload, meta } = action;
    try {
      yield put({ type: USER_TYPES.USER_LOGIN_LOADING });
      const authPayload = yield call([authProvider, 'login'], payload);
      yield put({
        type: USER_TYPES.USER_LOGIN_SUCCESS,
        payload: authPayload
      });
      const redirectTo = yield meta.pathName || select(nextPathnameSelector);
      yield put(push(redirectTo || '/'));
    } catch (e) {
      yield put({
        type: USER_TYPES.USER_LOGIN_FAILURE,
        error: e,
        meta: { auth: true }
      });
      const errorMessage = getErrorMessage(e, 'auth.sign_in_error');
      yield put(showNotification(errorMessage, 'warning'));
    }
  };

export const handleCheck = (authProvider) =>
  function* (action) {
    const { payload, meta } = action;
    try {
      yield call([authProvider, 'checkAuth'], payload);
    } catch (error) {
      const redirectTo = yield call([authProvider, 'logout'], undefined);
      yield put(
        replace({
          pathname: (error && error.redirectTo) || redirectTo || '/login',
          state: { nextPathname: meta.pathName }
        })
      );
      // Clear the state before showing a notification as it would be dismissed immediately otherwise
      yield put(clearState());

      const errorMessage = getErrorMessage(error, 'auth.auth_check_error');
      yield put(showNotification(errorMessage, 'warning'));
    }
  };

export const handleLogout = (authProvider) =>
  function* (action) {
    const { payload } = action;
    const redirectTo = yield call([authProvider, 'logout'], undefined);
    yield put(push((payload && payload.redirectTo) || redirectTo || '/login'));
    yield put(clearState());
  };

export const handleFetchError = (authProvider) =>
  function* (action) {
    const { error } = action;
    try {
      yield call([authProvider, 'checkError'], error);
    } catch (e) {
      const nextPathname = yield select(currentPathnameSelector);
      const redirectTo = yield call([authProvider, 'logout'], undefined);
      yield put(
        push({
          pathname: redirectTo || '/login',
          state: { nextPathname }
        })
      );
      // Clear the state before showing a notification as it would be dismissed immediately otherwise
      yield put(clearState());

      yield put(hideNotification());
      yield put(showNotification('notification.logged_out', 'warning'));
    }
  };
