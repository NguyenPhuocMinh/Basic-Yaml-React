import { httpClientAuthProvider } from '../services';
import constants from '../constants';
// auth handler
import {
  refreshTokenHandler,
  removeLogin,
  prepareResponse,
  getProfile
} from './authHandler';
// firebase
import {
  firebaseAuth,
  googleProvider,
  GoogleAuthProvider,
  signInWithPopup
} from '../firebase';
// lodash
import { get, isEmpty } from 'lodash';


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
        email: email,
        password: password,
      });
      const data = !isEmpty(response) && response.data;

      await prepareResponse(data);
      await refreshTokenHandler();

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

      await prepareResponse({ auth, user });
      await refreshTokenHandler();

      return response;
    } catch (err) {
      const credential = GoogleAuthProvider.credentialFromError(err);
      console.log("🚀 ~ file: AuthProvider.js ~ line 100 ~ loginWithGoogle: ~ credential", credential)
      return err.message;
    }
  },
  getIdentity: () => {
    return Promise.resolve(getProfile())
  }
};

export default authProvider;