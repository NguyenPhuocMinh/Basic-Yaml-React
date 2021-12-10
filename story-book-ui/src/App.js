import React from 'react';
// history
import { createBrowserHistory } from 'history';
// core
import authProvider from './authProvider/authProvider';
import { LoginPage, RegisterPage, Dashboard } from './components';
import { BootStrapCore, ResourceCore } from './core';
// i18n
import customReducers from './customStore/customReducers';
import i18nProvider from './i18n';
// layout
import { Layout } from './layout';
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
      {resources.map((resource, index) => (
        <ResourceCore
          key={index}
          name={resource.name}
          component={resource.component}
        />
      ))}
    </BootStrapCore>
  );
};

export default App;
