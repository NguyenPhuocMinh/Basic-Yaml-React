import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F2C48D',
    },
    secondary: {
      main: '#8C4404'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#F2C48D',
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
    MuiPopover: {
      styleOverrides: {
        paper: {
          '&::before': {
            background: '#F2C48D !important'
          }
        }
      }
    },
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

export default lightTheme;