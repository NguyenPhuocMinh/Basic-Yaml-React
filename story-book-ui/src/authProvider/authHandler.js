import { httpClient } from '../services';
import { get, isEmpty } from 'lodash';

export const refreshTokenHandler = () => {
  var refreshTokenHandlerInterval = setInterval(function () {
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

const refreshToken = async () => {
  try {
    const response = await httpClient.post('/refreshToken',
      {
        refreshToken: localStorage.getItem('refresh_token')
      },
      {
        headers: {
          'X-Access-Token': localStorage.getItem('access_token')
        }
      }
    )
    console.log("🚀 ~ file: authHandler.js ~ line 30 ~ refreshToken ~ response", response)

    const data = !isEmpty(response) && response.data;

    await prepareResponse(data);

    return response;
  } catch (err) {
    await removeLogin();
    return Promise.reject(err);
  }
};

export const removeLogin = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('expire_at');
};

const checkExpiredTime = () => {
  let timeFromGetLastToken = Math.floor(
    (Date.now() - localStorage.getItem('expire_at')) / 1000
  );
  const callRefresh = localStorage.getItem('expires_in') - timeFromGetLastToken < 30;
  return callRefresh;
};

const prepareResponse = (data) => {
  const accessToken = get(data, 'auth.access_token');
  const refreshToken = get(data, 'auth.refresh_token');
  const expiresIn = get(data, 'auth.expires_in');
  const permissions = get(data, 'auth.permissions');

  // authenticated
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('expires_in', expiresIn);
  localStorage.setItem('expire_at', Date.now());
  localStorage.setItem('permissions', permissions);
};
