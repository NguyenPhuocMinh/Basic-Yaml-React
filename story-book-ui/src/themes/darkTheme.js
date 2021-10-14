import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkText = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(229, 231, 235)',
  disabled: 'rgb(156, 163, 175)',
};

const darkPrimary = {
  light: '#C9CACE',
  main: '#4B4F5A',
  dark: '#23262E',
};

const darkSecondary = {
  light: '#F8F5F2',
  main: '#E6DED5',
  dark: '#D5C8BA',
  contrastText: '#23262E',
}

const darkTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
    text: darkText,
    primary: darkPrimary,
    secondary: darkSecondary,
    background: {
      paper: '#31343E',
      default: '#2A2D35',
    },
    error: {
      light: '#F7EAEA',
      main: '#EBCECE',
      dark: '#E3B9B9',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#31343E',
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: '#31343E',
          color: darkText.secondary
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E8EC',
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

export default darkTheme;