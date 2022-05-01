import { useTranslate } from 'story-bootstrap';
import { useSelector } from 'react-redux';
// material ui
import { Grid, Box, Paper, Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { handleDataChart } from './Utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { translate } = useTranslate();

  const store = useSelector((state) => {
    return state;
  });

  console.log(store)

  const { data, options } = handleDataChart(translate);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Box width="100%">
                <Line data={data} options={options} />
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Box width="100%">
          <Line data={data} options={options} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Chart;
