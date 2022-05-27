import { get, isEmpty } from 'lodash';
import { httpClientAuthProvider } from '../services';

const checkExpiredTime = () => {
  const timeFromGetLastToken = Math.floor(
    (Date.now() - localStorage.getItem('expire_at')) / 1000
  );
  const callRefresh =
    localStorage.getItem('expires_in') - timeFromGetLastToken < 30;
  return callRefresh;
};

const handleRefreshToken = async () => {
  try {
    const response = await httpClientAuthProvider.post('/refreshToken', {
      refreshToken: localStorage.getItem('refresh_token')
    });

    const data = !isEmpty(response) && get(response, 'data.data.result', {});

    prepareResponse(data);

    return response;
  } catch (err) {
    removeLogin();
    return Promise.reject(err);
  }
};

export const refreshTokenHandler = () => {
  const refreshTokenHandlerInterval = setInterval(() => {
    if (localStorage.getItem('refresh_token')) {
      if (checkExpiredTime()) {
        handleRefreshToken();
      }
    } else {
      removeLogin();
      clearInterval(refreshTokenHandlerInterval);
    }
  }, 1000);
};

export const removeLogin = () => {
  // auth
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('expire_at');
  localStorage.removeItem('permissions');
  // user
  localStorage.removeItem('emailUser');
  localStorage.removeItem('fullName');
  localStorage.removeItem('photoURL');
};

export const prepareResponse = (data = {}) => {
  const refreshToken = get(data, 'auth.refresh_token');
  const expiresIn = get(data, 'auth.expires_in');
  const permissions = get(data, 'auth.permissions');

  const emailUser = get(data, 'user.emailUser');
  const fullName = get(data, 'user.fullName');
  const photoURL = get(data, 'user.photoURL');

  // authenticated
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('expires_in', expiresIn);
  localStorage.setItem('expire_at', Date.now());
  localStorage.setItem('permissions', permissions);
  // user
  localStorage.setItem('emailUser', emailUser);
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('photoURL', photoURL);
};

export const getProfile = () => {
  const fullName = localStorage.getItem('fullName');
  const photoURL = localStorage.getItem('photoURL');

  return {
    fullName,
    photoURL
  };
};

export const getExpires = () => {
  const expiresIn = localStorage.getItem('expires_in');
  const expireAt = localStorage.getItem('expire_at');

  return {
    expiresIn,
    expireAt
  };
};
