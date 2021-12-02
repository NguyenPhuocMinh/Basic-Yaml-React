import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
// redux
import { Provider, ReactReduxContext } from 'react-redux';
// i18n
import { I18nextProvider } from 'react-i18next';
// history
import { createHashHistory } from 'history';
// context
import AuthContext from '../auth/AuthContext';
// convert
import {
  convertLegacyAuthProvider,
} from '../../convert';
// store
import rootStore from '../../store/rootStore';
import { BrowserRouter as Router } from 'react-router-dom';

const BootStrapCoreContext = (props) => {
  const {
    authProvider,
    i18nProvider,
    children,
    history,
    customReducers,
    customSagas,
    initialState,
  } = props;

  const reduxIsAlreadyInitialized = !!useContext(ReactReduxContext);

  const finalAuthProvider =
    authProvider instanceof Function
      ? convertLegacyAuthProvider(authProvider)
      : authProvider;

  const finalHistory = history || createHashHistory();

  const renderCore = () => {
    return (
      <AuthContext.Provider value={finalAuthProvider}>
        <I18nextProvider i18nProvider={i18nProvider}>
          <Router history={finalHistory}>
            {children}
          </Router>
        </I18nextProvider>
      </AuthContext.Provider>
    );
  };

  const [store] = useState(() =>
    !reduxIsAlreadyInitialized
      ? rootStore({
        authProvider: finalAuthProvider,
        customReducers,
        customSagas,
        initialState,
        history: finalHistory,
      })
      : undefined
  );

  if (reduxIsAlreadyInitialized) {
    if (!history) {
      throw new Error(`Missing history prop`);
    }
    return renderCore();
  } else {
    return <Provider store={store}>{renderCore()}</Provider>;
  }
};

BootStrapCoreContext.propTypes = {
  children: PropTypes.node,
  history: PropTypes.any,
  customReducers: PropTypes.any,
  customSagas: PropTypes.any,
  initialState: PropTypes.object,
}

export default BootStrapCoreContext;