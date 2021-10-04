import { forwardRef, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  useLocation
} from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// actions
import { adminActions } from '../store/actions';
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import NavBar from './NavBar';
import { get } from 'lodash';
import { DynamicMui, DynamicMuiIcon } from '../common';
import { version } from '../../package.json';

import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import Menu from './Menu';
// data
import routerData from '../data';

const NavLinkRef = forwardRef((props, ref) => {
  return (
    <NavLink innerRef={ref} {...props} />
  )
});

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

const useStyles = makeStyles(theme => ({
  selectedRow: {
    // color: 'rgba(0, 0, 0, 0.87)',
    // '&.MuiListItem-root': {
    //   color: theme.palette.primary.main
    // },
    // '& .MuiListItemIcon-root': {
    //   color: theme.palette.primary.main
    // },
  },
  notSelectedRow: {
    // color: 'rgba(0, 0, 0, 0.54)',
  },
}))

const drawerWidth = 240;

const Layout = props => {
  // hooks
  const location = useLocation();
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  // states
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const [toggle, setToggle] = useState({});

  // func
  const handleClickSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
    dispatch(adminActions.changeSideBar(!sideBarIsOpen));
  };

  const handleToggle = (newToggle) => {
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [newToggle]: !prevToggle[newToggle]
      }
    })
  };
  // router
  const routers = get(props, 'dynamicDefinition.routers', []);

  console.log("AAAA", toggle)

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        handleClickSideBar={handleClickSideBar}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={sideBarIsOpen}
      >
        <DrawerHeader>
          <Typography
            variant='body2'
            color='inherit'
            fontSize='small'
            fontWeight={500}
          >
            {translate('title')}
          </Typography>
          <Typography
            variant='body2'
            color='inherit'
            fontSize='small'
            fontWeight={500}
          >
            {`v${version}`}
          </Typography>
        </DrawerHeader>
        <Divider />
        <Menu menuRouters={routerData} />
        {/* <NavBar> */}
        {/* <List>
          {routers.map((item, index) => {
            const { name, path, iconName } = item;
            const selected = path === location.pathname;

            return (
              <ListItem
                button
                key={index}
                component={NavLinkRef}
                to={path}
                selected={selected}
                className={selected ? classes.selectedRow : classes.notSelectedRow}
              >
                <ListItemIcon>
                  <DynamicMuiIcon iconName={iconName} />
                </ListItemIcon>
                <ListItemText primary={translate(`resources.${name}.title`)} />
              </ListItem>
            )
          })}
        </List> */}
        {/* <Box>
            <ListItemButton
              onClick={() => setOpenStory(!openStory)}
              sx={{ px: 3 }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText
                primary="Story books"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '2px',
                }}
                sx={{ my: 0 }}
              />
              {openStory ? (
                <KeyboardArrowDown
                  sx={{ mr: -1 }}
                />
              ) : (
                  <KeyboardArrowRightIcon
                    sx={{ mr: -1 }}
                  />
                )
              }
            </ListItemButton>
            {openStory &&
              data.map((item) => {
                return (
                  <ListItemButton
                    key={item.label}
                    sx={{
                      py: 0,
                      minHeight: 32
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 12, marginLeft: '20px', fontWeight: 'medium' }}
                    />
                  </ListItemButton>
                )
              })}
          </Box> */}
        {/* </NavBar> */}
      </Drawer>
      <Main open={sideBarIsOpen}>
        <DrawerHeader />
        <Switch>
          {routers.map((item, index) => {
            return (
              <Route
                key={index}
                exact={item.exact}
                path={item.path}
                component={() => <DynamicMui componentDefinition={item.component} />}
              />
            )
          })}
          <Redirect from="*" to="/not-found" />
        </Switch>
      </Main>
    </Box>
  );
}

export default Layout;
