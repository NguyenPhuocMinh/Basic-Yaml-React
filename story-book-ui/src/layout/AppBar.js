import { useState } from 'react';
// redux
import {
  changeTheme,
  changeLanguage
} from '../customStore/customActions';
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GithubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from '@mui/styles';
import {
  AppBarHelper,
  PopupHelper,
  SettingHelper,
  ProfileHelper,
  useTranslate,
  useGetIdentity
} from '../core';

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}))

const AppBarLayout = ({ isOpen, toggleSidebar, ...props }) => {
  // hooks
  const classes = useStyles();
  const translate = useTranslate();
  const { fullName } = useGetIdentity();
  // states
  const [anchorLanguage, setAnchorLanguage] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);

  const openPopupLanguage = Boolean(anchorLanguage);
  const openPopupProfile = Boolean(anchorProfile);
  // func
  const handleClickChangeLng = (event) => {
    setAnchorLanguage(event.currentTarget);
  };

  const handleCloseChangeLng = () => {
    setAnchorLanguage(null);
  };

  const handleClickChangeProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseChangeProfile = () => {
    setAnchorProfile(null);
  };

  const [openSetting, setOpenSetting] = useState(false);

  const handleChangeSetting = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenSetting(!openSetting);
  };

  return (
    <AppBarHelper position="fixed" open={isOpen}>
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
          variant='body2'
          color='inherit'
          fontSize='small'
          fontWeight={500}
        >
          {translate(`appBar.toolbar.title`)}
        </Typography>
        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
            flexWrap: 'wrap',
          }}
        >
          <Box width="auto" minWidth={50}>
            <Tooltip
              title={translate('appBar.toolbar.tooltip.github')}
            >
              <IconButton
                color="inherit"
                onClick={() => window.open('https://github.com/NguyenPhuocMinh/story-book', '_blank')}
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box width="auto" minWidth={50}>
            <IconButton
              color="inherit"
            >
              <NotificationsNoneIcon />
            </IconButton>
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip
              title={translate('appBar.toolbar.tooltip.change_language')}
            >
              <IconButton
                color="inherit"
                onClick={handleClickChangeLng}
              >
                <TranslateIcon />
              </IconButton>
            </Tooltip>
            <PopupHelper
              open={openPopupLanguage}
              anchorEl={anchorLanguage}
              handleClose={handleCloseChangeLng}
              changeLanguage={changeLanguage}
            />
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip
              title={translate('appBar.toolbar.tooltip.change_setting')}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleChangeSetting}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <SettingHelper
              open={openSetting}
              anchor='right'
              toggleDrawer={handleChangeSetting}
              changeTheme={changeTheme}
            />
          </Box>
          <Box width="auto" minWidth={50}>
            <Tooltip
              title={translate('appBar.toolbar.tooltip.change_profile')}
            >
              <IconButton
                color="inherit"
                onClick={handleClickChangeProfile}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://hanoifootball.vn/data/source/seomaster/hinh-nen/tai-hinh-anh-ronaldo.jpg"
                  sx={{ width: 16, height: 16, marginRight: '10px' }}
                />
                <Typography variant="caption">
                  {fullName}
                </Typography>
              </IconButton>
            </Tooltip>
            <ProfileHelper
              open={openPopupProfile}
              anchorEl={anchorProfile}
              handleClose={handleCloseChangeProfile}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBarHelper>
  )
};

export default AppBarLayout;