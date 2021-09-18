import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './layout/Layout';
import dynamicServices from './services/dynamic-service';

const theme = createTheme();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Layout dynamicDefinition={dynamicServices.getSysRouters()} />
    </ThemeProvider>
  );
}

export default App;