const handleDataChart = (translate) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: translate('resources.dashboard.chart.title')
      },
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)',
          boxWidth: 100,
          boxHeight: 20
        }
      }
    },
    elements: {
      point: {
        rotation: 10
      }
    }
  };

  const data = {
    labels: [
      translate('resources.dashboard.chart.labels.jan'),
      translate('resources.dashboard.chart.labels.feb'),
      translate('resources.dashboard.chart.labels.mar'),
      translate('resources.dashboard.chart.labels.apr'),
      translate('resources.dashboard.chart.labels.may'),
      translate('resources.dashboard.chart.labels.jun'),
      translate('resources.dashboard.chart.labels.july'),
      translate('resources.dashboard.chart.labels.aug'),
      translate('resources.dashboard.chart.labels.sep'),
      translate('resources.dashboard.chart.labels.oct'),
      translate('resources.dashboard.chart.labels.nov'),
      translate('resources.dashboard.chart.labels.dec')
    ],
    datasets: [
      {
        label: translate(
          'resources.dashboard.chart.datasets.labels.newVisitor'
        ),
        data: [
          1000, 6000, 3500, 8900, 3000, 5000, 1000, 1000, 1000, 1000, 1000, 1000
        ],
        backgroundColor: '#9ccc65',
        borderColor: '#9ccc65',
        hoverBorderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.45,
        borderCapStyle: 'round',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#9ccc65',
        pointBorderColor: '#fff'
      },
      {
        label: translate(
          'resources.dashboard.chart.datasets.labels.repeatedUser'
        ),
        data: [
          1000, 3000, 5500, 3800, 5300, 4000, 1000, 1000, 1000, 1000, 1000, 1000
        ],
        borderColor: '#ffac33',
        backgroundColor: '#ffac33',
        hoverBorderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.45,
        borderCapStyle: 'round',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ffac33',
        pointBorderColor: '#fff'
      },
      {
        label: translate(
          'resources.dashboard.chart.datasets.labels.subscriber'
        ),
        data: [
          1000, 2000, 1200, 3200, 1600, 2200, 1000, 1000, 1000, 1000, 1000, 1000
        ],
        backgroundColor: '#2979ff',
        borderColor: '#2979ff',
        hoverBorderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.45,
        borderCapStyle: 'round',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#2979ff',
        pointBorderColor: '#fff'
      },
      {
        label: translate('resources.dashboard.chart.datasets.labels.share'),
        data: [
          1000, 1500, 700, 2400, 1200, 1400, 1000, 1000, 1000, 1000, 1000, 1000
        ],
        backgroundColor: '#7c4dff',
        borderColor: '#7c4dff',
        hoverBorderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.45,
        borderCapStyle: 'round',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#7c4dff',
        pointBorderColor: '#fff'
      }
    ]
  };

  return { data, options };
};

export { handleDataChart };
