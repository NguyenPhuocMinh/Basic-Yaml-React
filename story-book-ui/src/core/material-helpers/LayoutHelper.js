import React, { createElement, Suspense } from 'react';
import PropTypes from 'prop-types';
// version
import packageMeta from '../../../package.json';
// redux
import { useDispatch, useSelector } from 'react-redux';
// actions
import { changeSideBar } from '../store/actions';
// material ui
import {
  Box,
  Drawer,
  Typography,
  Divider,
  useMediaQuery,
  CssBaseline
} from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
// helpers
import DrawerHeaderHelper from './DrawerHeaderHelper';
import ErrorHelper from './ErrorHelper';
import LoadingHelper from './LoadingHelper';
import MainHelper from './MainHelper';
import NavBarHelper from './NavBarHelper';
import BreadCrumbHelper from './BreadCrumbHelper';
// hooks
import { useTranslate } from '../hooks';
import { ThemeProvider } from '@mui/material/styles';

const LayoutHelper = (props) => {
  const {
    theme,
    appBar,
    dashboard,
    logout,
    menu,
    title,
    drawerWidth,
    children,
    routes
  } = props;

  // hooks
  const { translate } = useTranslate();
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const dispatch = useDispatch();
  // store
  const open = useSelector((state) => state.admin.sidebarIsOpen);
  // func
  const toggleSidebar = () => dispatch(changeSideBar(!open));

  return (
    <Suspense fallback={LoadingHelper}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorHelper}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            {createElement(appBar, {
              title,
              isOpen: open,
              toggleSidebar,
              logout
            })}
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box'
                }
              }}
              variant={isXSmall ? 'temporary' : 'persistent'}
              anchor="left"
              open={open}
            >
              <DrawerHeaderHelper>
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontSize="small"
                  fontWeight={500}
                >
                  {translate(title)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  fontSize="small"
                  fontWeight={500}
                >
                  {`v${packageMeta.version}`}
                </Typography>
              </DrawerHeaderHelper>
              <Divider />
              {createElement(menu, {
                logout,
                hasDashboard: !!dashboard
              })}
            </Drawer>
            <MainHelper open={open} drawerwidth={drawerWidth}>
              <NavBarHelper style={{ display: 'flex' }} />
              <BreadCrumbHelper routes={routes} />
              {children}
            </MainHelper>
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    </Suspense>
  );
};

LayoutHelper.propTypes = {
  appBar: PropTypes.any,
  theme: PropTypes.object,
  menu: PropTypes.any,
  drawerWidth: PropTypes.number
};

export default LayoutHelper;
