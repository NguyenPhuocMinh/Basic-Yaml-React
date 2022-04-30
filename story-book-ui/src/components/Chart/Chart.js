import React, { useState } from 'react';
// material ui
import { Grid, Box } from '@mui/material';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartContent = (props) => {
  const options = {
    animation: {
      duration: 1000,
      loop: true
    },
    scales: {
      y: {
        // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 100
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Second dataset',
        fill: true,
        data: [33, 25, 35, 51, 54, 76],
        borderColor: '#742774'
      }
    ]
  };

  return (
    <Box sx={{ width: 'auto', maxWidth: '800px' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default ChartContent;
