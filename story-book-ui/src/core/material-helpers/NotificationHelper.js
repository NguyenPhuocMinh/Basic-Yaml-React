import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// redux
import { useSelector, useDispatch } from 'react-redux';
// material ui
import { Snackbar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
// hooks
import { useTranslate } from '../hooks';
import {
  hideNotification,
  complete,
  undo,
  undoAbleEventEmitter,
} from '../store/actions';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
  undo: (props) => ({
    color:
      props.type === 'success'
        ? theme.palette.success.contrastText
        : theme.palette.primary.light,
  }),
}));

const TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

const createBackgroundSnackBarContent = (theme, type) => {
  switch (type) {
    case TYPES.SUCCESS:
      return theme.palette.success.main;
    case TYPES.WARNING:
      return theme.palette.error.light;
    case TYPES.ERROR:
      return theme.palette.error.dark;
    default:
      return 'inherit'
  }
};

const createColorSnackBarContent = (theme, type) => {
  switch (type) {
    case TYPES.SUCCESS:
      return theme.palette.success.contrastText;
    case TYPES.WARNING:
      return theme.palette.error.contrastText;
    case TYPES.ERROR:
      return theme.palette.error.contrastText;
    default:
      return 'inherit'
  }
}

const NotificationHelper = (props) => {
  const {
    type,
    className,
    autoHideDuration,
    multiLine,
    vertical,
    horizontal,
    ...rest
  } = props;

  // state
  const [open, setOpen] = useState(false);
  // store
  const notification = useSelector(state => state.admin.notification);
  // hooks
  const dispatch = useDispatch();
  const { translate } = useTranslate();
  const classes = useStyles(props);

  useEffect(() => {
    if (!isEmpty(notification)) {
      setOpen(true);
    }
  }, [notification]);

  const handleRequestClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleExited = useCallback(() => {
    if (notification && notification.undoable) {
      dispatch(complete());
      undoAbleEventEmitter.emit('end', { isUndo: false });
    }
    dispatch(hideNotification());
  }, [dispatch, notification]);

  const handleUndo = useCallback(() => {
    dispatch(undo());
    undoAbleEventEmitter.emit('end', { isUndo: true });
  }, [dispatch]);

  const colorType = (notification && notification.type) || type;

  return (
    <Snackbar
      open={open}
      color="error"
      anchorOrigin={{
        vertical: (notification && notification.vertical) || vertical,
        horizontal: (notification && notification.horizontal) || horizontal
      }}
      message={
        notification &&
        notification.message &&
        translate(notification.message, notification.messageArgs)
      }
      autoHideDuration={
        (notification && notification.autoHideDuration) ||
        autoHideDuration
      }
      disableWindowBlurListener={notification && notification.undoable}
      TransitionProps={{ onExited: handleExited }}
      onClose={handleRequestClose}
      ContentProps={{
        sx: {
          background: (theme) => createBackgroundSnackBarContent(theme, colorType),
          color: (theme) => createColorSnackBarContent(theme, colorType),
          whiteSpace: multiLine && 'pre-wrap'
        }
      }}
      action={
        notification && notification.undoable ? (
          <Button
            color="primary"
            className={classes.undo}
            size="small"
            onClick={handleUndo}
          >
            {translate('common.action.undo')}
          </Button>
        ) : null
      }
      {...rest}
    />
  );
};

NotificationHelper.propTypes = {
  type: PropTypes.string,
  autoHideDuration: PropTypes.number,
  multiLine: PropTypes.bool,
  vertical: PropTypes.oneOf(['top', 'bottom']),
  horizontal: PropTypes.oneOf(['center', 'right', 'left'])
};

NotificationHelper.defaultProps = {
  type: 'info',
  autoHideDuration: 4000,
  multiLine: false,
  vertical: 'bottom',
  horizontal: 'center'
};

export default NotificationHelper;