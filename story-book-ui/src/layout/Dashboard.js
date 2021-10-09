import { useTranslation } from 'react-i18next';
import { MenuItemSingleHelper } from '../material-helpers';
import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dashboard: {
    marginTop: '8px'
  }
})

const Dashboard = (props) => {
  const { ...rest } = props;
  const { t: translate } = useTranslation();

  const classes = useStyles();

  return (
    <Box>
      <MenuItemSingleHelper
        className={classes.dashboard}
        to={{
          pathname: '/',
          state: { _scrollToTop: true },
        }}
        primaryText={translate('resources.dashboard.name')}
        leftIcon="Dashboard"
        exact
        {...rest}
      />
    </Box>
  );
};

export default Dashboard;