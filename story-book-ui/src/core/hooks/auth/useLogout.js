import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import useAuthProvider, { defaultAuthParams } from './useAuthProvider';
import { clearState } from '../../store/actions';

/**
 * Get a callback for calling the authProvider.logout() method,
 * redirect to the login page, and clear the Redux state.
 *
 * @see useAuthProvider
 *
 * @returns {Function} logout callback
 *
 */
const useLogout = () => {
  // hooks
  const authProvider = useAuthProvider();
  const dispatch = useDispatch();
  const history = useHistory();

  // func
  const logout = useCallback(
    (
      params = {},
      redirectTo = defaultAuthParams.afterLogout,
      redirectToCurrentLocationAfterLogin = true
    ) =>
      authProvider.logout(params).then((redirectToFromProvider) => {
        console.log("🚀 ~ file: useLogout.js ~ line 31 ~ authProvider.logout ~ redirectToFromProvider", redirectToFromProvider)
      console.log("🚀 ~ file: useLogout.js ~ line 28 ~ useLogout ~ redirectTo", redirectTo)
        dispatch(clearState());
        history.push(redirectTo);
        return redirectToFromProvider;
      }),
    [authProvider, history, dispatch]
  );

  return logout;
};

export default useLogout;
