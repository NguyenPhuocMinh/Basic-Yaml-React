import useAuthProvider from './useAuthProvider';
import useDecodeToken from './useDecodeToken';

const getIdentityWithoutProvider = () => Promise.resolve({});

const useGetIdentity = () => {
  const authProvider = useAuthProvider();
  const { user } = useDecodeToken();

  return authProvider ? user : getIdentityWithoutProvider;
};

export default useGetIdentity;