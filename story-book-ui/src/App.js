import React from 'react';
// core
import {
  BootStrapCore,
  ResourceCore,
} from './core';
// history
import { createBrowserHistory } from 'history';
// i18n
import i18nProvider from './i18n';
// layout
import { Layout } from './layout';
// authProvider
import authProvider from './authProvider/authProvider';
// customReducers
import customReducers from './customStore/customReducers';
// components
import {
  LoginPage,
  RegisterPage,
  Dashboard,
} from './components';
// resources
import resources from './resources';

const App = () => {

  const history = createBrowserHistory();

  return (
    <BootStrapCore
      title="title" // see translate title
      authProvider={authProvider}
      customReducers={customReducers}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      loginPage={LoginPage}
      registerPage={RegisterPage}
      layout={Layout}
      history={history}
    >
      {resources.map((resource, index) => {
        return (
          <ResourceCore
            key={index}
            name={resource.name}
            component={resource.component}
          />
        )
      })}
    </BootStrapCore>
  )
}

export default App;