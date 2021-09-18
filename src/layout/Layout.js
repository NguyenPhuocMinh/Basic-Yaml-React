import { forwardRef, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  useLocation
} from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import { get } from 'lodash';
import { DynamicMui, DynamicMuiIcon } from '../common';

const NavLinkRef = forwardRef((props, ref) => {
  return (
    <NavLink innerRef={ref} {...props} />
  )
});

const useStyles = makeStyles(theme => ({
  selectedRow: {
    color: 'rgba(0, 0, 0, 0.87)',
    '&.MuiListItem-root': {
      color: theme.palette.primary.dark
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.dark
    },
  },
  notSelectedRow: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}))

const drawerWidth = 240;

const Layout = props => {
  const theme = useTheme();
  const location = useLocation();
  const classes = useStyles();

  const routers = get(props, 'dynamicDefinition.routers', []);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        location={location}
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
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
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
                  <DynamicMuiIcon icon={iconName} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Main open={open}>
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
