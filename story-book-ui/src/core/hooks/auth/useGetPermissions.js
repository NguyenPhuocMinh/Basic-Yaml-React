import { useCallback } from 'react';

import useAuthProvider from './useAuthProvider';

const getPermissionsWithoutProvider = () => Promise.resolve([]);

/**
 * Get a callback for calling the authProvider.getPermissions() method.
 *
 * @see useAuthProvider
 *
 * @returns {Function} getPermissions callback
 *
 * This is a low level hook. See those more specialized hooks
 * offering state handling.
 *
 */
const useGetPermissions = () => {
  const authProvider = useAuthProvider();
  const getPermissions = useCallback(
    (params = {}) => authProvider.getPermissions(params),
    [authProvider]
  );

  return authProvider ? getPermissions : getPermissionsWithoutProvider;
};

export default useGetPermissions;
