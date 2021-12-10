import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/actions';

/**
 * Hook for Notification Side Effect
 *
 * @example
 *
 * const notify = useNotify();
 * notify('Level complete');
 * notify('A problem occurred', 'warning');
 * notify('Deleted %{count} elements', 'info', { smart_count: 23 });
 * notify('Post renamed', 'info', {}, true)
 */
const useNotify = () => {
  const dispatch = useDispatch();
  return useCallback(
    (
      message,
      type,
      messageArgs = {},
      undoable,
      autoHideDuration,
      multiLine,
      vertical,
      horizontal
    ) => {
      if (typeof type === 'string') {
        dispatch(
          showNotification(message, type || 'info', {
            messageArgs,
            undoable,
            autoHideDuration,
            multiLine,
            vertical,
            horizontal
          })
        );
      } else {
        const { type: messageType, ...options } = type;
        dispatch(showNotification(message, messageType, options));
      }
    },
    [dispatch]
  );
};

export default useNotify;
