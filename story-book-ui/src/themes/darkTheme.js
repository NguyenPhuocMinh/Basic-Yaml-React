import { grey, amber } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const darkText = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(229, 231, 235)',
  disabled: 'rgb(156, 163, 175)'
};

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C2C2C3',
        main: amber[700],
        dark: amber[600]
      },
      secondary: {
        light: '#B8E1D9',
        main: '#129B7F',
        dark: '#056D4F',
        contrastText: '#FFFFFF'
      },
      common: {
        black: '#000',
        white: 'rgb(255, 255, 255)',
        text: grey[500],
        selected: 'rgba(255, 255, 255, 0.1)'
      },
      success: {
        main: '#bedd9a',
        light: '#a2cf6e',
        dark: '#27632a'
      },
      error: {
        main: '#f4511e',
        light: '#ffa733',
        dark: '#a02725'
      },
      background: {
        paper: '#262526',
        default: '#1E1D1E'
      }
    },
    status: {
      danger: 'orange'
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: '#262526',
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            background: '#262526',
            color: darkText.secondary
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            border: '1px solid #E5E8EC',
            borderRadius: '10px'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1rem !important'
          }
        }
      }
    },
    shape: {
      borderRadius: 5
    },
    typography: {
      fontFamily: [
        'IBM Plex Sans',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol'
      ].join(',')
    }
  })
);

export default darkTheme;
