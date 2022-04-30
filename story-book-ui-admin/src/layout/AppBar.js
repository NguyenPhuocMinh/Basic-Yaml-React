import { useState } from 'react';
// story-bootstrap
import {
  AppBarBootStrap,
  PopupBootStrap,
  SettingBootStrap,
  ProfileBootStrap,
  useTranslate,
  useGetIdentity,
  RefreshBootStrap
} from 'story-bootstrap';
// material ui
import GithubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// lodash
import { get } from 'lodash';
import { changeTheme, changeLanguage } from '../customStore/customActions';

const languages = [
  {
    name: 'en',
    countryCode: 'US'
  },
  {
    name: 'vn',
    countryCode: 'VN'
  }
];

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

const AppBarLayout = ({ isOpen, toggleSidebar, ...props }) => {
  const { location, navigate } = props;
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const { loading, identity } = useGetIdentity();

  const fullName = get(identity, 'fullName');
  const photoURL = get(identity, 'photoURL');
  // states
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);

  const openPopupLanguage = Boolean(anchorLanguage);
  const openPopupProfile = Boolean(anchorProfile);
  // func
  const handleClickChangeLng = event => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleCloseChangeLng = () => {
    setAnchorLanguage(null);
  };

  const handleClickChangeProfile = event => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseChangeProfile = () => {
    setAnchorProfile(null);
  };

  const [openSetting, setOpenSetting] = useState(false);

  const handleChangeSetting = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenSetting(!openSetting);
  };

  return (
    <AppBarBootStrap position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={classes.title}
          id="demo"
          variant="body2"
          color="inherit"
          fontSize="small"
          fontWeight={500}
        >
          {translate('appBar.toolbar.title')}
        </Typography>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
            flexWrap: 'wrap',
            justifyItems: 'center'
          }}
        >
          <Box width="auto" minWidth={50}>
            <RefreshBootStrap
              title={translate('appBar.toolbar.tooltip.refresh')}
            />
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip title={translate('appBar.toolbar.tooltip.github')}>
              <IconButton
                color="inherit"
                onClick={() =>
                  window.open(
                    'https://github.com/NguyenPhuocMinh/story-book',
                    '_blank'
                  )
                }
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip title={translate('appBar.toolbar.tooltip.notification')}>
              <IconButton color="inherit">
                <NotificationsNoneIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip
              title={translate('appBar.toolbar.tooltip.change_language')}
            >
              <IconButton color="inherit" onClick={handleClickChangeLng}>
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <PopupBootStrap
              languages={languages}
              open={openPopupLanguage}
              anchorEl={anchorLanguage}
              handleClose={handleCloseChangeLng}
              changeLanguage={changeLanguage}
            />
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip title={translate('appBar.toolbar.tooltip.change_setting')}>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleChangeSetting}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <SettingBootStrap
              open={openSetting}
              anchor="right"
              toggleDrawer={handleChangeSetting}
              changeTheme={changeTheme}
            />
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip title={translate('appBar.toolbar.tooltip.change_profile')}>
              <IconButton color="inherit" onClick={handleClickChangeProfile}>
                <Avatar
                  alt={fullName}
                  src={photoURL}
                  sx={{ width: 16, height: 16, marginRight: '10px' }}
                />
                <Typography variant="caption" sx={{ lineHeight: 1 }}>
                  {loading && (
                    <CircularProgress
                      sx={{ marginRight: '5px' }}
                      color="primary"
                      size={10}
                      thickness={2}
                    />
                  )}
                  {fullName}
                </Typography>
              </IconButton>
            </Tooltip>
            <ProfileBootStrap
              open={openPopupProfile}
              anchorEl={anchorProfile}
              handleClose={handleCloseChangeProfile}
              location={location}
              navigate={navigate}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBarBootStrap>
  );
};

export default AppBarLayout;
