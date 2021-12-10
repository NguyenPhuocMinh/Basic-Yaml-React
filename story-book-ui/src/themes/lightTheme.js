import { blueGrey, lightGreen } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightText = {
  primary: 'rgb(17, 24, 39)',
  secondary: 'rgb(107, 114, 128)',
  disabled: 'rgb(149, 156, 169)'
};

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#D2EFF2',
        main: lightGreen[500],
        dark: lightGreen[600]
      },
      secondary: {
        light: '#FFF2C6',
        main: '#FED441',
        dark: '#FDB91C',
        contrastText: '#1E1F23'
      },
      common: {
        black: '#000',
        white: 'rgb(255, 255, 255)',
        text: blueGrey[500],
        selected: 'rgb(0, 0, 0, 0.05)'
      },
      success: {
        main: '#aed581',
        light: '#bedd9a',
        dark: '#27632a'
      },
      error: {
        main: '#f4511e',
        light: '#ff8a65',
        dark: '#a02725'
      },
      background: {
        paper: '#FAF6F3',
        default: '#FFFFFF'
      }
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: '#FAF6F3',
            boxShadow:
              '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)'
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

export default lightTheme;
