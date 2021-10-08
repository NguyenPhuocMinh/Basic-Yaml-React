import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import HotTub from '@material-ui/icons/HotTub';
import History from '@material-ui/icons/History';
import classnames from 'classnames';
import Title from './TitleHelper';
// i18n
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(
  theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        height: '100vh',
        marginTop: '-3em',
      },
    },
    icon: {
      width: '9em',
      height: '9em',
    },
    message: {
      textAlign: 'center',
      fontFamily: 'Roboto, sans-serif',
      opacity: 0.5,
      margin: '0 1em',
    },
    toolbar: {
      textAlign: 'center',
      marginTop: '2em',
    },
  }),
);

function goBack() {
  window.history.go(-1);
}

const NotFoundHelper = props => {
  const {
    className,
    classes: classesOverride,
    title,
    ...rest
  } = props;
  const classes = useStyles(props);
  const { t: translate } = useTranslation();

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
          onClick={goBack}
        >
          {translate('action.button.back')}
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
  location: PropTypes.object,
};

export default NotFoundHelper;