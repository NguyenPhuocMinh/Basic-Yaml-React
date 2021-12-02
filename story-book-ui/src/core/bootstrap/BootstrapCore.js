import React from 'react';
import PropTypes from 'prop-types';
import { BootStrapCoreContext, BootStrapUI } from '../contexts';

const BootStrapCore = (props) => {
  const {
    authProvider,
    catchAll,
    children,
    customReducers,
    customSagas,
    dashboard,
    history,
    i18nProvider,
    initialState,
    layout,
    loading,
    loginPage,
    registerPage,
    logoutButton,
    theme,
    title = 'Demo Basic React',
  } = props;

  return (
    <BootStrapCoreContext
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      history={history}
      customReducers={customReducers}
      customSagas={customSagas}
      initialState={initialState}
    >
      <BootStrapUI
        layout={layout}
        dashboard={dashboard}
        catchAll={catchAll}
        theme={theme}
        title={title}
        loading={loading}
        loginPage={loginPage}
        registerPage={registerPage}
        logout={authProvider ? logoutButton : undefined}
      >
        {children}
      </BootStrapUI>
    </BootStrapCoreContext>
  );
};

BootStrapCore.propTypes = {
  authProvider: PropTypes.any,
  catchAll: PropTypes.any,
  customReducers: PropTypes.any,
  customSagas: PropTypes.any,
  dashboard: PropTypes.any,
  history: PropTypes.any,
  i18nProvider: PropTypes.any,
  initialState: PropTypes.object,
  layout: PropTypes.any,
  loading: PropTypes.element,
  loginPage: PropTypes.any,
  registerPage: PropTypes.any,
  logoutButton: PropTypes.element,
  theme: PropTypes.any,
  title: PropTypes.string,
}

export default BootStrapCore;