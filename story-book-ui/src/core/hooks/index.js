// authenticated
import useAuthProvider, { defaultAuthParams } from './auth/useAuthProvider';
import useGetPermissions from './auth/useGetPermissions';
import useLogout from './auth/useLogout';
import useAuthState from './auth/useAuthState';
import useAuthenticated from './auth/useAuthenticated';
import useGetIdentity from './auth/useGetIdentity';
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
  useGetIdentity,
  useLogout,
  useAuthState,
  useNotify,
  useTranslate,
  useSafeSetState,
  useTimeout
}