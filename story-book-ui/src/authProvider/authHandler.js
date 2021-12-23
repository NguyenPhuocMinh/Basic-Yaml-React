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

const refreshToken = async () => {
  try {
    const response = await httpClientAuthProvider.post(
      '/refreshToken',
      {
        refreshToken: localStorage.getItem('refresh_token')
      },
      {
        headers: {
          'X-Access-Token': localStorage.getItem('access_token')
        }
      }
    );

    const data = !isEmpty(response) && response.data;

    await prepareResponse(data);

    return response;
  } catch (err) {
    await removeLogin();
    return Promise.reject(err);
  }
};

export const refreshTokenHandler = () => {
  const refreshTokenHandlerInterval = setInterval(() => {
    if (localStorage.getItem('refresh_token')) {
      if (checkExpiredTime()) {
        refreshToken();
      }
    } else {
      removeLogin();
      clearInterval(refreshTokenHandlerInterval);
    }
  }, 1000);
};

export const removeLogin = () => {
  // auth
  localStorage.removeItem('access_token');
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
  const accessToken = get(data, 'auth.access_token');
  const refreshToken = get(data, 'auth.refresh_token');
  const expiresIn = get(data, 'auth.expires_in');
  const permissions = get(data, 'auth.permissions');

  const emailUser = get(data, 'user.emailUser');
  const fullName = get(data, 'user.fullName');
  const photoURL = get(data, 'user.photoURL');

  // authenticated
  localStorage.setItem('access_token', accessToken);
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
