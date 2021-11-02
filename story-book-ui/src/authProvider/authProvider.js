import { httpClient } from '../services';
import constants from '../constants';
import { refreshTokenHandler, removeLogin } from './authHandler';
import { get, isEmpty } from 'lodash';

const authProvider = {
  register: async (params) => {
    const { firstName, lastName, email, password, passwordConfirm } = params;

    try {
      const response = await httpClient.post('/register', {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm
      });

      return response;
    } catch (err) {
      return err.response;
    }
  },
  login: async (params) => {
    const { email, password } = params;

    try {
      const response = await httpClient.post('/login', {
        email: email,
        password: password,
      });

      const data = !isEmpty(response) && response.data;

      const accessToken = get(data, 'auth.access_token');
      const refreshToken = get(data, 'auth.refresh_token');
      const expiresIn = get(data, 'auth.expires_in');
      const permissions = get(data, 'auth.permissions');

      await refreshTokenHandler();

      // authenticated
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('expires_in', expiresIn);
      localStorage.setItem('expire_at', Date.now());
      localStorage.setItem('permissions', permissions);

      return response;
    } catch (err) {
      return err.response;
    }
  },
  logout: () => {
    removeLogin()
    return Promise.resolve();
  },
  checkError: (params) => {
    const status = params.status;
    switch (status) {
      case constants.STATUS.UNAUTHORIZED:
        removeLogin();
        return Promise.reject();
      case constants.STATUS.ACCESS_DENIED:
        return Promise.resolve({ redirectTo: '/access-denied' });
      default:
        return Promise.resolve();
    }
  },
  checkAuth: () => {
    const accessToken = localStorage.getItem('access_token');
    return !isEmpty(accessToken)
      ? Promise.resolve({ accessToken })
      : Promise.reject();
  },
  getPermissions: () => {
    const permissions = localStorage.getItem('permissions');
    return permissions ? Promise.resolve(permissions) : Promise.reject();
  },
};

export default authProvider;