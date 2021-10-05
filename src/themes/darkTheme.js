import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
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
          background: '#FFF',
          color: 'rgba(0, 0, 0, 0.87)',
          '&::before': {
            background: '#FFF !important'
          }
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

export default darkTheme;