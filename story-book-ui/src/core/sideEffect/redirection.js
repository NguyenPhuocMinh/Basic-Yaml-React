import { push } from 'connected-react-router';
import { put, takeEvery } from 'redux-saga/effects';

import { resolveRedirectTo } from '../utils';

/**
 * Redirection Side Effects
 */
export function* handleRedirection({
  payload,
  requestPayload,
  meta: { basePath, redirectTo }
}) {
  if (!redirectTo) {
    return;
  }

  yield put(
    push(
      resolveRedirectTo(
        redirectTo,
        basePath,
        payload
          ? payload.id || (payload.data ? payload.data.id : null)
          : requestPayload
          ? requestPayload.id
          : null,
        payload && payload.data
          ? payload.data
          : requestPayload && requestPayload.data
          ? requestPayload.data
          : null
      )
    )
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield takeEvery(
    (action) => action.meta && typeof action.meta.redirectTo !== 'undefined',
    handleRedirection
  );
}
