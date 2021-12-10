import React, { useCallback } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
// redux
import { useDispatch } from 'react-redux';
// action
// material ui
// location
import { useLocation, useHistory } from 'react-router-dom';
// hooks
import {
  useTranslate,
  useAuthProvider,
  useNotify,
  defaultAuthParams
} from '../hooks';
import { clearState } from '../store/actions';

const useStyles = makeStyles({
  selected: {
    background: 'rgb(0 0 0 / 12%) !important'
  }
});

const ProfileHelper = ({ open, anchorEl, handleClose }) => {
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const authProvider = useAuthProvider();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const notify = useNotify();

  const locationState = location.state;
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  const handleShowProfile = () => {};

  const handleLogout = useCallback(() => {
    dispatch(clearState());
    authProvider.logout().then(() => {
      notify('users.notification.logout.success', { type: 'success' });
      const redirectUrl =
        nextPathName + nextSearch || defaultAuthParams.loginUrl;
      history.push(redirectUrl);
    });
  }, [authProvider, dispatch, history, notify, nextPathName, nextSearch]);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem
        onClick={handleShowProfile}
        classes={{
          selected: classes.selected
        }}
      >
        <ListItemIcon>
          <RecentActorsIcon
            sx={{
              fontSize: '1.25rem',
              width: '1em',
              height: '1em'
            }}
          />
        </ListItemIcon>
        <Typography variant="caption">
          {translate('appBar.toolbar.profile.show_profile')}
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        classes={{
          selected: classes.selected
        }}
      >
        <ListItemIcon>
          <PowerSettingsNewIcon
            sx={{
              fontSize: '1.25rem',
              width: '1em',
              height: '1em'
            }}
          />
        </ListItemIcon>
        <Typography variant="caption">
          {translate('appBar.toolbar.profile.logout')}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileHelper;
