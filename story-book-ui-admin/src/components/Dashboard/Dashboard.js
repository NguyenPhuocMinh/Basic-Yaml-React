import { NotificationBootStrap } from 'story-bootstrap';
import { Box } from '@mui/material';
import Chart from './Chart';

const DashBoard = (props) => {
console.log("🚀 ~ file: Dashboard.js ~ line 6 ~ DashBoard ~ props 111222", props)
  return (
    <Box>
      <h1>DashBoard</h1>
      <Chart />
      <NotificationBootStrap />
    </Box>
  );
};

export default DashBoard;
