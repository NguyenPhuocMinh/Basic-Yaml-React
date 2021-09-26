import { forwardRef, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  useLocation
} from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import Main from './Main';
import { get } from 'lodash';
import { DynamicMui, DynamicMuiIcon } from '../common';
import { version } from '../../package.json';

const NavLinkRef = forwardRef((props, ref) => {
  return (
    <NavLink innerRef={ref} {...props} />
  )
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
  const location = useLocation();
  const classes = useStyles();
  const { t: translate } = useTranslation();

  const routers = get(props, 'dynamicDefinition.routers', []);

  const [open, setOpen] = useState(false);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        open={open}
        handleDrawerClick={handleDrawerClick}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // borderRight: '1px solid #E5E8EC'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
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
                  <DynamicMuiIcon iconName={iconName} />
                </ListItemIcon>
                <ListItemText primary={translate(`resources.${name}.title`)} />
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
