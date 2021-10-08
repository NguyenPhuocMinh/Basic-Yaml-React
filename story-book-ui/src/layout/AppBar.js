import { useState } from 'react';
// redux
import { useSelector } from 'react-redux';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TranslateIcon from '@mui/icons-material/Translate';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import GithubIcon from '@mui/icons-material/GitHub';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { PopupHelper, SettingHelper } from '../material-helpers';
// i18n
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
})

const AppBarLayout = ({ open, handleClickSideBar }) => {
  // hooks
  const classes = useStyles();
  const { t: translate } = useTranslation();
  // stores
  const sidebarIsOpen = useSelector(state => state.admin.ui.sidebarIsOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const openPopup = Boolean(anchorEl);

  const handleClickChangeLng = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const [openSetting, setOpenSetting] = useState(false);

  const handleChangeSetting = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenSetting(!openSetting);
  };

  return (
    <AppBar position="fixed" open={sidebarIsOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleClickSideBar}
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
              open={openPopup}
              anchorEl={anchorEl}
              handleClose={handleClosePopup}
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
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
};

export default AppBarLayout;