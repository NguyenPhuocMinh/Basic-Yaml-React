import { useState } from 'react';
import { version } from '../../package.json';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// redux
import { useDispatch } from 'react-redux';
// actions
import { adminActions } from '../store/actions';
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import { get } from 'lodash';
import { DynamicMui } from '../common';
import Menu from './Menu';
// data
import routerData from '../data';

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
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  // states
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  // func
  const handleClickSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
    dispatch(adminActions.changeSideBar(!sideBarIsOpen));
  };
  // router
  const routers = get(props, 'dynamicDefinition.routers', []);

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
