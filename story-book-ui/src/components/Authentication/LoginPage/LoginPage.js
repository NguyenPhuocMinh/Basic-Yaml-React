import {
  useCallback,
  useState,
  useEffect,
  useRef
} from 'react';
// redux
import { useDispatch } from 'react-redux';
import { resetNotification } from '../../../core/store/actions';
// material ui
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  alpha,
  Avatar,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../../themes';
import { makeStyles } from '@mui/styles';
// formik
import { Formik, Form } from 'formik';
// core
import {
  useAuthProvider,
  defaultAuthParams,
  useTranslate,
  useNotify,
  TextInputHelper,
  NotificationHelper,
} from '../../../core';
// validate
import { validateUserLogin } from '../../../validators';
import { get } from 'lodash';

const useStyles = makeStyles({
  input: {
    width: 256
  }
})

const LoginPage = (props) => {
  const { history, location } = props;

  // state
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // hooks
  const classes = useStyles();
  const translate = useTranslate();
  const authProvider = useAuthProvider();
  const dispatch = useDispatch();
  const notify = useNotify();
  const timer = useRef();

  // initialValue
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false
  };

  const locationState = location.state;
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleLogin = useCallback((params) => {
    setLoading(true);
    authProvider.login(params)
      .then(res => {
        if (res.status < 200 || res.status >= 400) {
          timer.current = window.setTimeout(() => {
            setLoading(false);
            const errorMessage = get(res, 'data.message');
            notify(`${errorMessage}`, { type: 'warning' });
          }, 500);
        } else {
          timer.current = window.setTimeout(() => {
            setLoading(false);
            dispatch(resetNotification());
            const redirectUrl = nextPathName + nextSearch || defaultAuthParams.afterLoginUrl;
            notify('users.notification.login.success', { type: 'success' });
            history.push(redirectUrl);
          }, 500);
          return res;
        }
      })
  }, [authProvider, dispatch, notify, history, nextPathName, nextSearch]);

  const handleRedirectRegisterPage = () => {
    history.push('/register')
  };

  const handleClickLoginWithGoogle = () => {
    console.log("handleClickLoginWithGoogle");
  };

  const handleClickLoginWithFacebook = () => {
    console.log("handleClickLoginWithFacebook")
  };


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleLogin(values)}
      validationSchema={validateUserLogin(translate)}
    >
      {(formProps) => {
        const {
          handleSubmit,
          handleChange,
          isValid,
          dirty,
          values
        } = formProps;
        return (
          <Form
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'url(https://source.unsplash.com/random/1600x900)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
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
                    minWidth: 400,
                  }}
                >
                  <Card>
                    <Box component="div"
                      sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
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
                        <TextInputHelper
                          label="users.labels.email"
                          required
                          id='email'
                          name='email'
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
                        <TextInputHelper
                          label="users.labels.password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          className={classes.input}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                sx={{
                                  border: 'none !important',
                                  ":hover": {
                                    background: 'none'
                                  },
                                  marginRight: '-8px !important'
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={(event) => event.preventDefault()}
                                edge="end"
                              >
                                {showPassword
                                  ? <VisibilityOff />
                                  : <Visibility />
                                }
                              </IconButton>
                            </InputAdornment>
                          }
                          {...formProps}
                        />
                      </Box>
                      <Box
                        sx={{
                          marginTop: '1em',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <FormControlLabel
                          sx={{
                            '& .MuiTypography-body1': {
                              fontSize: '0.875rem'
                            }
                          }}
                          control={
                            <Checkbox
                              sx={{
                                ":hover": {
                                  background: 'none'
                                },
                                fontSize: '0.875rem',
                              }}
                              name='rememberMe'
                              checked={values.rememberMe}
                              onChange={handleChange}
                            />
                          }
                          label={translate('users.labels.remember_me')}
                        />
                        <Typography color="primary" variant="body2" component="a" href="/">
                          {translate('users.forgotPass')}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        padding: '0 1em 1em 1em',
                        justifyContent: 'center'
                      }}
                    >
                      <Button
                        sx={{
                          width: 'auto',
                          minWidth: 256,
                          borderRadius: 12,
                          textTransform: 'capitalize',
                          ":hover": {
                            background: 'none'
                          }
                        }}
                        variant="contained"
                        type="submit"

                        disabled={!isValid || !dirty || loading}
                      >
                        {loading && (
                          <CircularProgress
                            sx={{ marginRight: '5px' }}
                            color='primary'
                            size={20}
                            thickness={2}
                          />
                        )}
                        {translate('users.actions.login')}
                      </Button>
                    </CardActions>
                    <Box
                      sx={{
                        marginTop: '1em',
                        marginBottom: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Divider sx={{ width: '3.2rem' }} />
                      <Typography variant='span'
                        sx={{
                          marginLeft: '0.8rem',
                          marginRight: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        {translate('users.texts.or')}
                      </Typography>
                      <Divider sx={{ width: '3.2rem' }} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1em'
                      }}
                    >
                      <Button
                        sx={{
                          width: 'auto',
                          minWidth: 210,
                          borderRadius: 12,
                          textTransform: 'none',
                        }}
                        variant="outlined"
                        onClick={handleClickLoginWithGoogle}
                      >
                        {translate('users.actions.login_google')}
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '0.5em'
                      }}
                    >
                      <Button
                        sx={{
                          marginBottom: '1em',
                          width: 'auto',
                          minWidth: 210,
                          borderRadius: 12,
                          textTransform: 'none',
                        }}
                        variant="outlined"
                        onClick={handleClickLoginWithFacebook}
                      >
                        {translate('users.actions.login_facebook')}
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '2em',
                        marginBottom: '2em'
                      }}
                    >
                      <Typography component="span" variant="body2">
                        {translate('users.texts.not_account')}
                      </Typography>
                      <Button
                        sx={{
                          textTransform: 'none',
                          ":hover": {
                            background: 'none'
                          }
                        }}
                        color="primary"
                        onClick={handleRedirectRegisterPage}
                      >
                        {translate('users.actions.register_account')}
                      </Button>
                    </Box>
                  </Card>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    minWidth: { md: 500 },
                    bgcolor: 'primary.main',
                  }}
                >
                  <Box
                    sx={{
                      p: '6.4rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
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
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        borderRadius: '5px',
                        fontWeight: 'medium',
                        display: 'flex',
                        fontSize: 14,
                        alignItems: 'center',
                        '& svg': {
                          fontSize: 21,
                          mr: 0.5,
                        },
                      }}
                    >
                      {translate('users.texts.description')}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <NotificationHelper />
          </Form>
        )
      }}
    </Formik>
  );
};

const LoginWithTheme = (props) => (
  <ThemeProvider theme={lightTheme}>
    <LoginPage {...props} />
  </ThemeProvider>
);

export default LoginWithTheme;