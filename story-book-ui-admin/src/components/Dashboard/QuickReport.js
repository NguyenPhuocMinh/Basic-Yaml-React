import { useTranslate, createIcon, createCountryFlag } from 'story-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  Box,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material';
import { Folder, Delete } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import registerIcons from '../../registerIcons';
import { handleDataTable } from './Utils';
import { formatQuantity } from '../../helpers';

const QuickReportDetail = ({
  data,
  title,
  translate,
  to,
  icon,
  dense = true
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={3}>
        <Card
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b',
            padding: '20px',
            marginTop: 2,
            marginBottom: '1em'
          }}
        >
          <Box display="flex" justifyContent="space-between" flex="1">
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                component="h2"
                color="inherit"
              >
                {translate(title)}
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="inherit"
                  component="p"
                  gutterBottom
                >
                  11
                </Typography>
              </Box>
            </Box>
            <Box>{createIcon({ icon, registerIcons })}</Box>
          </Box>
          <Divider />
          <List
            dense={dense}
            sx={{
              maxHeight: 500,
              overflowY: 'scroll'
            }}
          >
            {data.map((v) => {
              return (
                <ListItem
                  key={v.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Folder />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={v.name} secondary={v.email} />
                </ListItem>
              );
            })}
          </List>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={to}
              fullWidth
              sx={{
                textTransform: 'capitalize',
                borderColor: 0
              }}
              endIcon={<ArrowForwardIosIcon />}
            >
              {translate('common.button.viewAll')}
            </Button>
          </Box>
        </Card>
      </Paper>
    </Grid>
  );
};

const BestSalesRowDetail = ({
  data,
  colorRank,
  backgroundColorRank,
  locale
}) => {
  return (
    <TableRow>
      <TableCell align="left">
        <Box display="flex" flexWrap="wrap" alignItems="center">
          <ListItemAvatar>
            <Avatar>
              <Folder />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b'
            }}
            primary={data.name}
            secondary={data.email}
          />
        </Box>
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b'
        }}
      >
        {data.product}
      </TableCell>
      <TableCell align="right">
        {createCountryFlag({
          countryCode: data.code,
          style: {
            fontSize: '1.5rem',
            width: '1.5em',
            height: '1.5em'
          }
        })}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b'
        }}
      >
        {formatQuantity(data.total, locale)}
        {locale === 'vn' ? 'VND' : '$'}
      </TableCell>
      <TableCell align="right">
        <Box
          sx={{
            color: colorRank,
            backgroundColor: backgroundColorRank,
            textAlign: 'center',
            borderRadius: '6px',
            padding: '6px 0px'
          }}
        >
          <Typography variant="body2" fontWeight={700}>
            {data.rank}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
};

const BestSalesReportDetail = ({ _, title, translate, to, locale }) => {
  const { columns, rows } = handleDataTable(translate);

  const [rowTop1, rowTop2, rowTop3, rowTop4, rowTop5] = rows;

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Paper elevation={3}>
        <Card
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#9e9e9e' : '#607d8b',
            padding: '20px',
            marginTop: 2,
            marginBottom: '1em'
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Box flex="1">
              <Typography
                variant="h5"
                gutterBottom
                component="h2"
                color="inherit"
              >
                {translate(title)}
              </Typography>
              <Box>
                <Typography
                  variant="body1"
                  color="inherit"
                  component="p"
                  gutterBottom
                >
                  {translate('resources.dashboard.quickReport.top5')}
                </Typography>
              </Box>
            </Box>
            <Box>
              <EmojiEventsIcon sx={{ width: 36, height: 36 }} />
            </Box>
          </Box>
          <Divider />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        minWidth: column.minWidth
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <BestSalesRowDetail
                  data={rowTop1}
                  colorRank="#2e7031"
                  backgroundColorRank="#d0e7b7"
                  locale={locale}
                />
                <BestSalesRowDetail
                  data={rowTop2}
                  colorRank="#155fa0"
                  backgroundColorRank="#83c3f7"
                  locale={locale}
                />
                <BestSalesRowDetail
                  data={rowTop3}
                  colorRank="#af6200"
                  backgroundColorRank="#ffd699"
                  locale={locale}
                />
                <BestSalesRowDetail
                  data={rowTop4}
                  colorRank="#971243"
                  backgroundColorRank="#f6a5c0"
                  locale={locale}
                />
                <BestSalesRowDetail
                  data={rowTop5}
                  colorRank="#a02725"
                  backgroundColorRank="#f2aeae"
                  locale={locale}
                />
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={1}>
            <Button
              size="small"
              color="primary"
              component={Link}
              to={to}
              fullWidth
              sx={{
                textTransform: 'capitalize',
                borderColor: 0
              }}
              endIcon={<ArrowForwardIosIcon />}
            >
              {translate('common.button.viewAll')}
            </Button>
          </Box>
        </Card>
      </Paper>
    </Grid>
  );
};

const QuickReport = () => {
  const { translate, i18n } = useTranslate();

  const _ = useSelector((state) => state);

  const locale = i18n.language === 'vn' ? 'vi-VN' : 'en-US';

  return (
    <Box sx={{ marginTop: '1em' }}>
      <Grid container spacing={3}>
        <QuickReportDetail
          title="resources.dashboard.quickReport.newCustomers"
          translate={translate}
          to="/customers"
          icon="Add"
        />
        <QuickReportDetail
          title="resources.dashboard.quickReport.pendingOrders"
          translate={translate}
          to="/pendingOrders"
          icon="PendingActions"
        />
        <BestSalesReportDetail
          title="resources.dashboard.quickReport.bestSalesman"
          translate={translate}
          to="/sales"
          locale={locale}
        />
      </Grid>
    </Box>
  );
};

export default QuickReport;
