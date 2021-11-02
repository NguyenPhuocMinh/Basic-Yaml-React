import { createElement, useMemo } from 'react';
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
    title = 'Demo Basic React',
  } = props;

  const logoutElement = useMemo(() => logout && createElement(logout), [
    logout,
  ]);

  return (
    <Switch>
      <Route
        path='/login'
        render={(renderProps) => {
          return createElement(loginPage, {
            ...renderProps,
            title,
            theme,
          })
        }}
      />
      <Route
        path='/register'
        render={(renderProps) => {
          return createElement(registerPage, {
            ...renderProps,
            title,
            theme,
          })
        }}
      />
      <Route
        path="/"
        render={renderProps => {
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
          )
        }}
      />
    </Switch>
  );
};

const Noop = () => null;

export default BootStrapCoreUI;