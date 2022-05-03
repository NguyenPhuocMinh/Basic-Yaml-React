import { useTranslate, createIcon } from 'story-bootstrap';
import { useSelector } from 'react-redux';
import { Grid, Paper, Box, Typography, Avatar } from '@mui/material';
import registerIcons from '../../registerIcons';
import { formatQuantity } from '../../helpers';

const ReportDetail = ({ data, title, icon, locale }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        elevation={3}
        sx={{
          textAlign: 'center',
          paddingTop: '40px',
          paddingBottom: '40px'
        }}
      >
        <Avatar
          sx={{
            margin: 'auto auto 24px',
            background: (theme) => theme.palette.primary.main,
            width: 56,
            height: 56
          }}
        >
          {createIcon({ icon, registerIcons })}
        </Avatar>
        <Typography
          variant="h3"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b'
          }}
        >
          {formatQuantity(data, locale)}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b'
          }}
        >
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
};

const Report = () => {
  const { translate, i18n } = useTranslate();
  const _ = useSelector((state) => state);

  const dataWeeklySales = '714000000000';
  const dataNewCustomers = '101212';
  const dataItemOrders = '20000';
  const dataPendingOrders = '3033333';

  const locale = i18n.language === 'vn' ? 'vi-VN' : 'en-US';

  return (
    <Box sx={{ marginBottom: '1em' }}>
      <Grid container spacing={3}>
        <ReportDetail
          data={dataWeeklySales}
          title={translate('resources.dashboard.report.weeklySales')}
          icon="Assessment"
          locale={locale}
        />
        <ReportDetail
          data={dataNewCustomers}
          title={translate('resources.dashboard.report.newCustomers')}
          icon="PersonAdd"
          locale={locale}
        />
        <ReportDetail
          data={dataItemOrders}
          title={translate('resources.dashboard.report.itemOrders')}
          icon="LocalGroceryStore"
          locale={locale}
        />
        <ReportDetail
          data={dataPendingOrders}
          title={translate('resources.dashboard.report.pendingOrders')}
          icon="BugReport"
          locale={locale}
        />
      </Grid>
    </Box>
  );
};

export default Report;
