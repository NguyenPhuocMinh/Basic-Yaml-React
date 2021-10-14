import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightText = {
  primary: 'rgb(17, 24, 39)',
  secondary: 'rgb(107, 114, 128)',
  disabled: 'rgb(149, 156, 169)',
};

const lightPrimary = {
  light: '#D2EFF2',
  main: '#68C8D5',
  dark: '#3AA7BA',
};

const lightSecondary = {
  light: '#FFF2C6',
  main: '#FED441',
  dark: '#FDB91C',
  contrastText: '#1E1F23',
}

const lightTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'light',
    text: lightText,
    primary: lightPrimary,
    secondary: lightSecondary,
    background: {
      paper: '#FAF6F3',
      default: '#FFFFFF',
    },
    error: red,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FAF6F3',
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: '#FAF6F3',
          color: lightText.secondary
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: '1px solid rgb(149, 156, 169)',
          borderRadius: '10px',
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1rem !important'
        }
      }
    },
  },
  shape: {
    borderRadius: 10
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
}))

export default lightTheme;