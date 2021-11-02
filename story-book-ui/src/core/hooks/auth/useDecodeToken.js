import { useEffect } from 'react';
// decode token
import jwt_decode from 'jwt-decode';
// hooks
import useAuthState from './useAuthState';
import useSafeSetState from '../utils/useSafeSetState';
// lodash
import { isEmpty, get } from 'lodash';

const useDecodeToken = () => {
  const { token } = useAuthState();
  const [state, setState] = useSafeSetState({
    user: {},
  });

  useEffect(() => {
    if (!isEmpty(token)) {
      const decodeToken = jwt_decode(token);
      if (!isEmpty(decodeToken)) {
        const userLogin = get(decodeToken, 'userLogin');
        const fullName = `${userLogin.lastName} ${userLogin.firstName}`;
        setState({
          user: {
            fullName
          },
        })
      }
    }
  }, [token, setState])

  return state;
};

export default useDecodeToken;