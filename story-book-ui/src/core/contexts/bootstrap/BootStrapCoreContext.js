import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
// history
import { createHashHistory } from 'history';
// redux
import { Provider, ReactReduxContext } from 'react-redux';
// i18n
import { I18nextProvider } from 'react-i18next';
// convert
import { convertLegacyAuthProvider } from '../../convert';
import rootStore from '../../store/rootStore';
import AuthContext from '../auth/AuthContext';

const BootStrapCoreContext = (props) => {
  const {
    authProvider,
    i18nProvider,
    children,
    history,
    customReducers,
    customSagas,
    initialState
  } = props;
  console.log(
    '🚀 ~ file: BootStrapCoreContext.js ~ line 25 ~ BootStrapCoreContext ~ props',
    props
  );

  const reduxIsAlreadyInitialized = !!useContext(ReactReduxContext);
  console.log(
    '🚀 ~ file: BootStrapCoreContext.js ~ line 28 ~ BootStrapCoreContext ~ reduxIsAlreadyInitialized',
    reduxIsAlreadyInitialized
  );

  const finalAuthProvider =
    authProvider instanceof Function
      ? convertLegacyAuthProvider(authProvider)
      : authProvider;

  const finalHistory = history || createHashHistory();

  const renderCore = () => (
    <AuthContext.Provider value={finalAuthProvider}>
      <I18nextProvider i18nProvider={i18nProvider}>
        <Router history={finalHistory}>{children}</Router>
      </I18nextProvider>
    </AuthContext.Provider>
  );

  const [store] = useState(() =>
    !reduxIsAlreadyInitialized
      ? rootStore({
          authProvider: finalAuthProvider,
          customReducers,
          customSagas,
          initialState,
          history: finalHistory
        })
      : undefined
  );

  if (reduxIsAlreadyInitialized) {
    if (!history) {
      throw new Error('Missing history prop');
    }
    return renderCore();
  }
  return <Provider store={store}>{renderCore()}</Provider>;
};

BootStrapCoreContext.propTypes = {
  children: PropTypes.node,
  history: PropTypes.any,
  customReducers: PropTypes.any,
  customSagas: PropTypes.any,
  initialState: PropTypes.object
};

export default BootStrapCoreContext;
