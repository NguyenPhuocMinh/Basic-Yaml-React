import React, { createElement, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
// core router
import BootStrapUIRouter from './BootStrapUIRouter';

const BootStrapCoreUI = (props) => {
  const {
    catchAll = Noop,
    children,
    dashboard,
    layout,
    loading = Noop,
    loginPage,
    registerPage,
    logout,
    theme,
    title = 'Demo Basic React'
  } = props;
  console.log(
    '🚀 ~ file: BootStrapCoreUI.js ~ line 19 ~ BootStrapCoreUI ~ props',
    props
  );

  const logoutElement = useMemo(
    () => logout && createElement(logout),
    [logout]
  );
  console.log(
    '🚀 ~ file: BootStrapCoreUI.js ~ line 24 ~ BootStrapCoreUI ~ logoutElement',
    logoutElement
  );

  return (
    <Switch>
      <Route
        path="/login"
        render={(renderProps) => {
          console.log(
            '🚀 ~ file: BootStrapCoreUI.js ~ line 44 ~ BootStrapCoreUI ~ renderProps login',
            renderProps
          );
          return createElement(loginPage, {
            ...renderProps,
            title,
            theme
          });
        }}
      />
      <Route
        path="/register"
        render={(renderProps) =>
          createElement(registerPage, {
            ...renderProps,
            title,
            theme
          })
        }
      />
      <Route
        path="/"
        render={(renderProps) => {
          console.log(
            '🚀 ~ file: BootStrapCoreUI.js ~ line 73 ~ BootStrapCoreUI ~ renderProps /',
            renderProps
          );
          return (
            <BootStrapUIRouter
              catchAll={catchAll}
              dashboard={dashboard}
              layout={layout}
              loading={loading}
              logout={logoutElement}
              theme={theme}
              title={title}
              {...renderProps}
            >
              {children}
            </BootStrapUIRouter>
          );
        }}
      />
    </Switch>
  );
};

var Noop = () => {
  return null;
};

export default BootStrapCoreUI;
