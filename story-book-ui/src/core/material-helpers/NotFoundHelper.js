import classnames from 'classnames';
import PropTypes from 'prop-types';
import History from '@mui/icons-material/History';
import HotTub from '@mui/icons-material/HotTub';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Title from './TitleHelper';
// hooks
import { useTranslate } from '../hooks';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    },
    [theme.breakpoints.down('sm')]: {
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
  },
  toolbar: {
    textAlign: 'center',
    marginTop: '2em'
  }
}));

const NotFoundHelper = (props) => {
  const { className, classes: classesOverride, title, ...rest } = props;

  // hooks
  const classes = useStyles(props);
  const { translate } = useTranslate();

  const { history } = props;

  return (
    <div
      className={classnames(classes.container, className)}
      {...sanitizeRestProps(rest)}
    >
      <Title defaultTitle={title} />
      <div className={classes.message}>
        <HotTub className={classes.icon} />
        <h1>{translate('page.not_found.name')}</h1>
        <div>{translate('page.not_found.message')}.</div>
      </div>
      <div className={classes.toolbar}>
        <Button
          variant="contained"
          startIcon={<History />}
          onClick={() => history.push('/')}
        >
          {translate('actions.button.back')}
        </Button>
      </div>
    </div>
  );
};

const sanitizeRestProps = ({
  staticContext,
  history,
  location,
  match,
  ...rest
}) => rest;

NotFoundHelper.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.object
};

export default NotFoundHelper;
