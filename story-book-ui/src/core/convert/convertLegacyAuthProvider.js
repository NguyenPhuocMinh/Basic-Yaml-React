import { AUTH_TYPES } from '../store/constants';

const convertLegacyAuthProvider = (legacyAuthProvider) => {
  console.log(
    '🚀 ~ file: convertLegacyAuthProvider.js ~ line 4 ~ convertLegacyAuthProvider ~ legacyAuthProvider',
    legacyAuthProvider
  );
  const authProvider = (...args) => {
  console.log("🚀 ~ file: convertLegacyAuthProvider.js ~ line 9 ~ authProvider ~ args", ...args)
    return legacyAuthProvider.apply(null, args);
  };

  authProvider.register = (params) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_REGISTER, params);
  authProvider.login = (params) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_LOGIN, params);
  authProvider.logout = (params) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_LOGOUT, params);
  authProvider.checkAuth = (params) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_CHECK, params);
  authProvider.checkError = (error) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_ERROR, error);
  authProvider.getPermissions = (params) =>
    legacyAuthProvider(AUTH_TYPES.AUTH_GET_PERMISSIONS, params);

  return authProvider;
};

export default convertLegacyAuthProvider;
