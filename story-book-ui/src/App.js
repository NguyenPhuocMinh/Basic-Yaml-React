import React from 'react';
import { createBrowserHistory } from 'history';
// i18n
import i18nProvider from './i18n';
import { Layout } from './layout';
// core
import { BootStrapCore, ResourceCore } from './core';
// authProvider
import authProvider from './authProvider/authProvider';
// customReducers
import customReducers from './customStore/customReducers';
// components
import {
  LoginPage,
  RegisterPage,
  Dashboard,
  VampireList,
  VampireCreate,
  MonsterList,
  MonsterCreate,
} from './components';

const App = () => {

  const history = createBrowserHistory();

  return (
    <BootStrapCore
      title="title"
      authProvider={authProvider}
      customReducers={customReducers}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      loginPage={LoginPage}
      registerPage={RegisterPage}
      layout={Layout}
      history={history}
    >
      <ResourceCore
        name="vampires"
        basePath="/vampires"
        component={VampireList}
      />
      <ResourceCore
        name="vampires/create"
        basePath="/vampires/create"
        component={VampireCreate}
      />
      <ResourceCore
        name="monsters"
        basePath="/monsters"
        component={MonsterList}
      />
      <ResourceCore
        name="monsters/create"
        basePath="/monsters/create"
        component={MonsterCreate}
      />
    </BootStrapCore>
  )
}

export default App;