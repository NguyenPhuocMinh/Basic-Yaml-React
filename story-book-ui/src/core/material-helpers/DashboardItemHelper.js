import { useTranslate } from '../hooks';
import MenuItemSingleHelper from './MenuItemSingleHelper';
import { Box } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dashboard: {
    marginTop: '8px'
  }
})

const DashboardItemHelper = (props) => {
  const { ...rest } = props;
  const translate = useTranslate();

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

export default DashboardItemHelper;