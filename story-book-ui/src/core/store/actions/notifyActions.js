import PropTypes from 'prop-types';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

/**
 * Shows a snackbar/toast notification on the screen
 *
 * @see {@link https://material-ui.com/api/snackbar/|Material ui snackbar component}
 * @see {@link https://material.io/guidelines/components/snackbars-toasts.html|Material ui reference document on snackbar}
 */
export const showNotification = (message, type = 'info', notificationOptions) => ({
  type: SHOW_NOTIFICATION,
  payload: {
    ...notificationOptions,
    type,
    message,
  },
});

showNotification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  notificationOptions: PropTypes.shape({
    autoHideDuration: PropTypes.number,
    messageArgs: PropTypes.any,
    multiLine: PropTypes.bool,
    undoable: PropTypes.bool,
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['center', 'right', 'left'])
  })
};

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
});

export const resetNotification = () => ({
  type: RESET_NOTIFICATION,
});
