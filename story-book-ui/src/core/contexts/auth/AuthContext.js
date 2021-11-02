import { createContext } from 'react';

const defaultProvider = {
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  checkError: () => Promise.resolve(),
  getPermissions: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

export default AuthContext;