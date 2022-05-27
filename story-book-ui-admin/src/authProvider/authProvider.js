import { get, isEmpty } from 'lodash';
import { httpClientAuthProvider } from '../services';
import {
  refreshTokenHandler,
  removeLogin,
  prepareResponse,
  getProfile,
  getExpires
} from './authHandler';
import { firebaseAuth, googleProvider, signInWithPopup } from '../firebase';
import constants from '../constants';

const authProvider = {
  register: async (params) => {
    const { firstName, lastName, email, password, passwordConfirm } = params;

    try {
      const response = await httpClientAuthProvider.post('/register', {
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
      const response = await httpClientAuthProvider.post('/login', {
        email,
        password
      });
      const data = !isEmpty(response) && get(response, 'data.data.result', {});

      prepareResponse(data);
      refreshTokenHandler();

      return response;
    } catch (err) {
      return err.response;
    }
  },
  logout: () => {
    removeLogin();
    return Promise.resolve();
  },
  checkError: (params) => {
    const { status } = params;
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
    const authenticated = localStorage.getItem('authenticated');
    return authenticated
      ? Promise.resolve({ authenticated: true })
      : Promise.reject({ authenticated: false });
  },
  getPermissions: () => {
    const permissions = localStorage.getItem('permissions');
    return permissions ? Promise.resolve(permissions) : Promise.reject();
  },
  loginWithGoogle: async () => {
    try {
      const response = await signInWithPopup(firebaseAuth, googleProvider);
      const userLogin = !isEmpty(response) && response.user;
      const stsTokenManager = get(userLogin, 'stsTokenManager');
      // authentication
      const auth = {
        access_token: get(stsTokenManager, 'accessToken'),
        refresh_token: get(userLogin, 'refreshToken'),
        expires_in: get(stsTokenManager, 'expirationTime'),
        permissions: ['USER']
      };
      // user info
      const user = {
        emailUser: get(response, 'user.email'),
        fullName: get(response, 'user.displayName'),
        photoURL: get(response, 'user.photoURL')
      };

      prepareResponse({ auth, user });
      refreshTokenHandler();

      return response;
    } catch (err) {
      return err.message;
    }
  },
  getIdentity: () => Promise.resolve(getProfile()),
  checkExpiredToken: () => Promise.resolve(getExpires())
};

export default authProvider;
