import React, { Suspense } from 'react';
import './i18n';
import Layout from './layout/Layout';
import dynamicServices from './services/dynamic-service';
import CssBaseline from '@mui/material/CssBaseline';
// theme
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';
// redux
import { useSelector } from 'react-redux';

const App = () => {

  const theme = useSelector(state => state.theme);
  const themes = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Suspense fallback="loading...">
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <Layout dynamicDefinition={dynamicServices.getSysRouters()} />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;