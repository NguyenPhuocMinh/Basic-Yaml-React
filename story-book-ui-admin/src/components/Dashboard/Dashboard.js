import { NotificationBootStrap } from 'story-bootstrap';
import { Box } from '@mui/material';
import Chart from './Chart';

const DashBoard = () => {
  return (
    <Box>
      <h1>DashBoard</h1>
      <Chart />
      <NotificationBootStrap />
    </Box>
  );
};

export default DashBoard;
