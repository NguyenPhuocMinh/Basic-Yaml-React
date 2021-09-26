import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: '#007FFF',
    // },
    // secondary: {
    //   main: '#edf2ff',
    // },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFF',
          borderBottom: '1px solid #EAEEF3',
          boxShadow: 'none',
          color: '#2F3A45',
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: '1px solid #E5E8EC',
          borderRadius: '10px',
          color: '#007FFF',
          background: '#FFF',
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem'
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