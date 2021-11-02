import { useContext } from 'react';
import { AuthContext } from '../../contexts';

const useAuthProvider = () => useContext(AuthContext);

export const defaultAuthParams = {
  loginUrl: '/login',
  afterLoginUrl: '/',
  afterRegisterUrl: '/login',
  afterLogout: '/login'
};

export default useAuthProvider;
