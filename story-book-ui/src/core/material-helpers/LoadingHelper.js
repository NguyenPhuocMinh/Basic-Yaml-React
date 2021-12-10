import classnames from 'classnames';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    },
    [theme.breakpoints.down('lg')]: {
      height: '100vh',
      marginTop: '-3em'
    }
  },
  icon: {
    width: '9em',
    height: '9em'
  },
  message: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    opacity: 0.5,
    margin: '0 1em'
  }
}));

const LoadingHelper = (props) => {
  const {
    className
    // LoadingHelperPrimary = '',
    // LoadingHelperSecondary = '',
  } = props;
  const classes = useStyles(props);
  // const translate = useTranslate();
  return (
    <div className={classnames(classes.container, className)}>
      <div className={classes.message}>
        <CircularProgress className={classes.icon} color="primary" />
        {/* <h1>{translate(LoadingHelperPrimary)}</h1> */}
        {/* <div>{translate(LoadingHelperSecondary)}.</div> */}
      </div>
    </div>
  );
};

LoadingHelper.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  LoadingHelperPrimary: PropTypes.string,
  LoadingHelperSecondary: PropTypes.string
};

LoadingHelper.defaultProps = {};

export default LoadingHelper;
