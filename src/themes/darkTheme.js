const darkTheme = {
  palette: {
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFF',
          borderStyle: 'solid',
          boxShadow: 'none',
          borderColor: '#EAEEF3',
          color: '#2F3A45',
          borderWidth: 'thin',
          padding: '0 2px',
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
    }
  },
}

export default darkTheme;