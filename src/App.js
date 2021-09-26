import React, { Suspense, useEffect } from 'react';
import './i18n';
import Layout from './layout/Layout';
import dynamicServices from './services/dynamic-service';
// theme
import { ThemeProvider } from '@mui/material/styles';
import themes from './themes';
// redux
import { useSelector } from 'react-redux';

const App = () => {

  return (
    <Suspense fallback="loading...">
      <ThemeProvider theme={themes}>
        <Layout dynamicDefinition={dynamicServices.getSysRouters()} />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;