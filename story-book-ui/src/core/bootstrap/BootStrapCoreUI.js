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

  const logoutElement = useMemo(
    () => logout && createElement(logout),
    [logout]
  );

  return (
    <Switch>
      <Route
        path="/login"
        render={(renderProps) =>
          createElement(loginPage, {
            ...renderProps,
            title,
            theme
          })
        }
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
        render={(renderProps) => (
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
        )}
      />
    </Switch>
  );
};

var Noop = () => {
  return null;
};

export default BootStrapCoreUI;
