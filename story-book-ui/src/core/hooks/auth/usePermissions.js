import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import useGetPermissions from './useGetPermissions';
import useSafeSetState from '../utils/useSafeSetState';

const emptyParams = {};

/**
 * Hook for getting user permissions
 *
 * Calls the authProvider.getPermissions() method asynchronously.
 * If the authProvider returns a rejected promise, returns empty permissions.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { permissions: [any], loading: false, loaded: true }
 * - error: { error: [error from provider], loading: false, loaded: true }
 *
 * Useful to enable features based on user permissions
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { permissions, error, loading, loaded }.
 *
 */
const usePermissions = (params = emptyParams) => {
  const [state, setState] = useSafeSetState({
    loading: true,
    loaded: false
  });
  const getPermissions = useGetPermissions();
  useEffect(() => {
    const getPermissionAccess = async () => {
      try {
        const permissions = await getPermissions();
        if (!isEmpty(permissions)) {
          setState({ loading: false, loaded: true, permissions });
        }
      } catch (err) {
        setState({
          loading: false,
          loaded: true,
          error: err
        });
      }
    };
    getPermissionAccess();
  }, [getPermissions, params, setState]);
  return state;
};

export default usePermissions;
