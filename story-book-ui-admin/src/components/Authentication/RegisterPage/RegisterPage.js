import { useCallback, useEffect, useRef, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
// story bootstrap
import {
  useAuthProvider,
  defaultAuthParams,
  useTranslate,
  useNotify,
  NotificationBootStrap,
  TextInputBootStrap,
  SimpleFormBootStrap,
  Form,
  resetNotification
} from 'story-bootstrap';
// material ui
import EngineeringIcon from '@mui/icons-material/Engineering';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/MailOutlineOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  alpha,
  Avatar,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
// lodash
import { get } from 'lodash';
// theme
import { lightTheme } from '../../../themes';
// validate
import { validateUserRegister } from '../../../validators';

const useStyles = makeStyles({
  input: {
    width: 256
  }
});

const RegisterPage = props => {
  const { navigate, location } = props;

  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const classes = useStyles();
  const { translate } = useTranslate();
  const authProvider = useAuthProvider();
  const dispatch = useDispatch();
  const notify = useNotify();
  const timer = useRef();

  // initialValue
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  const locationState = location.state;
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  useEffect(
    () => () => {
      clearTimeout(timer.current);
    },
    []
  );

  const handleRegister = useCallback(
    params => {
      setLoading(true);
      authProvider.register(params).then(res => {
        if (res.status < 200 || res.status >= 400) {
          timer.current = window.setTimeout(() => {
            setLoading(false);
            const errorMessage = get(res, 'data.message');
            notify(`${errorMessage}`, { type: 'warning' });
          }, 1000);
        } else {
          timer.current = window.setTimeout(() => {
            setLoading(false);
            dispatch(resetNotification());
            const redirectUrl =
              nextPathName + nextSearch || defaultAuthParams.afterRegisterUrl;
            notify('users.notification.register.success', { type: 'success' });
            !loading && navigate(redirectUrl);
          }, 1000);
          return res;
        }
      });
    },
    [
      authProvider,
      dispatch,
      loading,
      notify,
      navigate,
      nextPathName,
      nextSearch
    ]
  );

  const handleRedirectLoginPage = () => {
    navigate('/login');
  };

  return (
    <SimpleFormBootStrap
      initialValues={initialValues}
      onSubmit={handleRegister}
      validationSchema={validateUserRegister(translate)}
      formContent={formProps =>
        FormRegister(formProps, {
          classes,
          translate,
          loading,
          handleRedirectLoginPage
        })
      }
    />
  );
};

const FormRegister = (formProps, options = {}) => {
  // options
  const { classes, translate, loading, handleRedirectLoginPage } = options;
  // formProps
  const { handleSubmit, isValid, dirty } = formProps;

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url(https://source.unsplash.com/random/1600x900)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            bgcolor: 'background.paper',
            overflow: 'hidden',
            boxShadow: 1,
            fontWeight: 'bold',
            borderRadius: 5
          }}
        >
          <Box
            sx={{
              minWidth: 400
            }}
          >
            <Card>
              <Box
                component="div"
                sx={{
                  margin: '1em',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Avatar alt="" src="https://source.unsplash.com/random" />
              </Box>
              <Box
                component="div"
                sx={{
                  marginTop: '1em',
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'primary.main'
                }}
              >
                {translate('users.title')}
              </Box>
              <CardContent>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="users.labels.first_name"
                    required
                    name="firstName"
                    className={classes.input}
                    endAdornment={
                      <InputAdornment position="end">
                        <HowToRegIcon />
                      </InputAdornment>
                    }
                    {...formProps}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="users.labels.last_name"
                    required
                    name="lastName"
                    endAdornment={
                      <InputAdornment position="end">
                        <EngineeringIcon />
                      </InputAdornment>
                    }
                    className={classes.input}
                    {...formProps}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="users.labels.email"
                    required
                    name="email"
                    endAdornment={
                      <InputAdornment position="end">
                        <MailIcon />
                      </InputAdornment>
                    }
                    className={classes.input}
                    {...formProps}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="users.labels.password"
                    name="password"
                    type="password"
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <VpnKeyIcon />
                      </InputAdornment>
                    }
                    className={classes.input}
                    {...formProps}
                  />
                </Box>
                <Box
                  sx={{
                    marginTop: '1em',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <TextInputBootStrap
                    label="users.labels.password_confirm"
                    name="passwordConfirm"
                    type="password"
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    }
                    className={classes.input}
                    {...formProps}
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  padding: '0 1em 1em 1em',
                  justifyContent: 'center',
                  marginTop: '1em'
                }}
              >
                <Button
                  sx={{
                    width: 'auto',
                    minWidth: 256,
                    borderRadius: 12,
                    textTransform: 'capitalize'
                  }}
                  variant="contained"
                  type="submit"
                  disabled={!isValid || !dirty || loading}
                >
                  {loading && (
                    <CircularProgress
                      sx={{ marginRight: '5px' }}
                      color="primary"
                      size={20}
                      thickness={2}
                    />
                  )}
                  {translate('users.actions.register_account')}
                </Button>
              </CardActions>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '2em'
                }}
              >
                <Typography component="span" variant="body2">
                  {translate('users.texts.has_account')}
                </Typography>
                <Button
                  sx={{
                    textTransform: 'none',
                    ':hover': {
                      background: 'none'
                    }
                  }}
                  color="primary"
                  onClick={handleRedirectLoginPage}
                >
                  {translate('users.actions.login')}
                </Button>
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: 'flex',
              minWidth: { md: 500 },
              bgcolor: 'primary.main'
            }}
          >
            <Box
              sx={{
                p: '6.4rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Box component="span" sx={{ fontSize: 22, mt: 1 }}>
                {translate('users.texts.welcome')}
              </Box>
              <Box component="span" sx={{ fontSize: 18 }}>
                {translate('users.texts.subtitle')}
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  backgroundColor: theme =>
                    alpha(theme.palette.primary.main, 0.1),
                  borderRadius: '5px',
                  fontWeight: 'medium',
                  display: 'flex',
                  fontSize: 14,
                  alignItems: 'center',
                  '& svg': {
                    fontSize: 21,
                    mr: 0.5
                  }
                }}
              >
                {translate('users.texts.description')}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <NotificationBootStrap />
    </Form>
  );
};

const RegisterWithTheme = props => {
  return (
    <ThemeProvider theme={lightTheme}>
      <RegisterPage {...props} />
    </ThemeProvider>
  );
};

export default RegisterWithTheme;
