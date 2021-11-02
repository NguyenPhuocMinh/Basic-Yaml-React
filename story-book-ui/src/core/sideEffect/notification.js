import { put, takeEvery } from 'redux-saga/effects';
import {
  showNotification,
} from '../store/actions';

/**
 * Notification Side Effects
 */
function* handleNotification({
  error,
  meta: { notification, optimistic },
}) {
  const { body, level, messageArgs = {} } = notification;
  if (error) {
    return yield put(
      showNotification(
        typeof error === 'string' ? error : error.message || body,
        level || 'warning',
        {
          messageArgs,
          undoable: false,
        }
      )
    );
  }
  yield put(
    showNotification(body, level || 'info', {
      messageArgs,
      undoable: optimistic,
    })
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield takeEvery(
    // @ts-ignore
    action => action.meta && action.meta.notification,
    handleNotification
  );
}
