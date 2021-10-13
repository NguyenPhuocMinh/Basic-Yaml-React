import { createContext, useContext } from 'react';

const defaultIdentity = { id: '' };

const defaultProvider = {
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => Promise.resolve(defaultIdentity),
};

const AuthContext = createContext(defaultProvider);

const defaultAuthParams = {
  loginUrl: '/login',
  afterLoginUrl: '/',
};

/**
 * Get the authProvider stored in the context
 */
const useAuthProvider = () => useContext(AuthContext);

export {
  AuthContext,
  useAuthProvider,
  defaultAuthParams
};