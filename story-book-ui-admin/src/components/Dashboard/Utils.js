const handleDataChart = (translate, theme) => {
  const optionsLine = {
    plugins: {
      title: {
        display: true,
        text: translate('resources.dashboard.chart.line.title')
      },
      legend: {
        display: true,
        labels: {
          color: theme === 'dark' ? '#9e9e9e' : '#607d8b',
          boxWidth: 100,
          boxHeight: 20
        }
      },
      datalabels: {
        labels: {
          title: null
        }
      }
    },
    elements: {
      point: {
        rotation: 10
      }
    },
    interaction: {
      mode: 'x'
    },
    responsive: true
  };

  const dataLine = {
    labels: [
      translate('resources.dashboard.chart.line.labels.jan'),
      translate('resources.dashboard.chart.line.labels.feb'),
      translate('resources.dashboard.chart.line.labels.mar'),
      translate('resources.dashboard.chart.line.labels.apr'),
      translate('resources.dashboard.chart.line.labels.may'),
      translate('resources.dashboard.chart.line.labels.jun'),
      translate('resources.dashboard.chart.line.labels.july'),
      translate('resources.dashboard.chart.line.labels.aug'),
      translate('resources.dashboard.chart.line.labels.sep'),
      translate('resources.dashboard.chart.line.labels.oct'),
      translate('resources.dashboard.chart.line.labels.nov'),
      translate('resources.dashboard.chart.line.labels.dec')
    ],
    datasets: [
      {
        label: translate(
          'resources.dashboard.chart.line.datasets.labels.newVisitor'
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
          'resources.dashboard.chart.line.datasets.labels.repeatedUser'
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
          'resources.dashboard.chart.line.datasets.labels.subscriber'
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
        label: translate(
          'resources.dashboard.chart.line.datasets.labels.share'
        ),
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

  const optionsPie = {
    plugins: {
      title: {
        display: true,
        text: translate('resources.dashboard.chart.pie.title')
      },
      legend: {
        display: true,
        labels: {
          color: theme === 'dark' ? '#9e9e9e' : '#607d8b',
          boxWidth: 50,
          boxHeight: 20,
          usePointStyle: true,
          padding: 30
        },
        borderWidth: 2,
        position: 'bottom'
      },
      datalabels: {
        formatter: (value, context) => {
          const datasets = context.chart.data.datasets;
          const sum = datasets[0].data.reduce((a, b) => a + b, 0);
          let percentage = 0 + '%';
          if (datasets.indexOf(context.dataset) === datasets.length - 1) {
            percentage = Math.round((value / sum) * 100) + '%';
            return percentage;
          }
          return percentage;
        },
        font: {
          weight: 'bold'
        }
      }
    },
    responsive: true
  };

  const dataPie = {
    labels: [
      translate('resources.dashboard.chart.pie.labels.america'),
      translate('resources.dashboard.chart.pie.labels.asia'),
      translate('resources.dashboard.chart.pie.labels.europe'),
      translate('resources.dashboard.chart.pie.labels.africa')
    ],
    datasets: [
      {
        label: 'My Chart',
        data: [12.444, 19, 3, 5],
        borderWidth: 1,
        backgroundColor: ['#1769aa', '#35baf6', '#ffeb3b', '#834bff'],
        hoverOffset: 4,
        datalabels: {
          color: theme === 'dark' ? '#000' : '#dd33fa'
        }
      }
    ]
  };

  return { dataLine, optionsLine, dataPie, optionsPie };
};

const handleDataTable = (translate) => {
  const columns = [
    {
      id: 'seller',
      label: translate('resources.dashboard.quickReport.seller')
    },
    {
      id: 'product',
      label: translate('resources.dashboard.quickReport.product'),
      align: 'right'
    },
    {
      id: 'country',
      label: translate('resources.dashboard.quickReport.country'),
      align: 'right'
    },
    {
      id: 'total',
      label: translate('resources.dashboard.quickReport.total'),
      align: 'right'
    },
    {
      id: 'rank',
      label: translate('resources.dashboard.quickReport.rank'),
      align: 'right'
    }
  ];

  function createData(name, email, product, code, total, rank) {
    return { name, email, product, code, total, rank };
  }

  const rows = [
    createData('India', 'India@gmail.com', 'CAP', 'IN', '1324171354', 'Top 1'),
    createData(
      'China',
      'China@gmail.com',
      'Branded Shoes',
      'CN',
      '1403500365',
      'Top 2'
    ),
    createData(
      'Italy',
      'Italy@gmail.com',
      'Headphone',
      'IT',
      '60483973',
      'Top 3'
    ),
    createData(
      'United States',
      'US@gmail.com',
      'Cell Phone',
      'US',
      '327167434',
      'Top 4'
    ),
    createData(
      'Canada',
      'Canada@gmail.com',
      'Earings',
      'CA',
      '37602103',
      'Top 5'
    )
  ];

  return {
    rows,
    columns
  };
};

export { handleDataChart, handleDataTable };
