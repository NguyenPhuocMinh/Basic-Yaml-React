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
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Line, Pie } from 'react-chartjs-2';
import { handleDataChart } from './Utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Chart = () => {
  const { translate } = useTranslate();

  const { theme } = useSelector((state) => {
    return {
      theme: state.theme
    };
  });

  const { dataLine, optionsLine, dataPie, optionsPie } = handleDataChart(
    translate,
    theme
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Box width="100%">
                <Line data={dataLine} options={optionsLine} />
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Card>
            <CardContent>
              <Box width="100%">
                <Pie data={dataPie} options={optionsPie} />
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chart;
