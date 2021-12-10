// authenticated
import useAuthenticated from './auth/useAuthenticated';
import useAuthProvider, { defaultAuthParams } from './auth/useAuthProvider';
import useAuthState from './auth/useAuthState';
import useCheckRoles from './auth/useCheckRoles';
import useGetIdentity from './auth/useGetIdentity';
import useGetPermissions from './auth/useGetPermissions';
import useLogout from './auth/useLogout';
import usePermissions from './auth/usePermissions';
// sideEffect
import useNotify from './sideEffect/useNotify';
import useTranslate from './sideEffect/useTranslate';
// utils
import useSafeSetState from './utils/useSafeSetState';
import useTimeout from './utils/useTimeout';

export {
  useAuthProvider,
  defaultAuthParams,
  useAuthenticated,
  useGetPermissions,
  usePermissions,
  useGetIdentity,
  useLogout,
  useAuthState,
  useCheckRoles,
  useNotify,
  useTranslate,
  useSafeSetState,
  useTimeout
};
