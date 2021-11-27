import { useEffect } from 'react';
import useAuthProvider from './useAuthProvider';
import useSafeSetState from '../utils/useSafeSetState';

const defaultIdentity = {
  fullName: null,
  photoURL: null
};

const useGetIdentity = () => {
  const [state, setState] = useSafeSetState({
    loading: true,
    loaded: false,
  });

  const authProvider = useAuthProvider();
  useEffect(() => {
    const callGetIdentity = async () => {
      try {
        const identity = await authProvider.getIdentity();
        setState({
          loading: false,
          loaded: true,
          identity: identity || defaultIdentity
        })
      } catch (err) {
        setState({
          loading: false,
          loaded: true,
          error: err
        })
      }
    }
    callGetIdentity();
  }, [authProvider, setState])

  return state;
};

export default useGetIdentity;