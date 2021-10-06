import React, { Suspense } from 'react';
// i18n
import './i18n';
import Layout from './layout/Layout';
import dynamicServices from './services/dynamic-service';
// theme
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';
// redux
import { useSelector } from 'react-redux';
// errors handlers
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHelper } from './material-helpers';

const App = () => {

  const theme = useSelector(state => state.theme);
  const themes = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Suspense fallback="loading...">
      <ThemeProvider theme={themes}>
        <ErrorBoundary FallbackComponent={ErrorHelper}>
          <Layout dynamicDefinition={dynamicServices.getSysRouters()} />
        </ErrorBoundary>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;