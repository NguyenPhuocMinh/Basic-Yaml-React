import { createTheme } from '@mui/material/styles';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const theme = createTheme(lightTheme);

createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderColor: 'red'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottomWidth: 'thin'
        }
      }
    }
  },
  typography: {
    fontFamily: [
      "IBM Plex Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol"
    ].join(',')
  }
})

export default theme;