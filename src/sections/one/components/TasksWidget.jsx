import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TaskWidget({ title, percent, total, chart, sx, ...other }) {
  const { series, options } = chart;

  const chartOptions = {
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, opacity: 1 },
          { offset: 100, opacity: 1 },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '68%',
        borderRadius: 2,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (value) => value,
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
    ...options,
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
          <Iconify
            width={24}
            icon={
              percent < 0
                ? 'solar:double-alt-arrow-down-bold-duotone'
                : 'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
              mr: 1,
              color: 'success.main',
              ...(percent < 0 && {
                color: 'error.main',
              }),
            }}
          />

          <Typography component="div" variant="subtitle2">
            {percent > 0 && '+'}

            {percent}
          </Typography>
        </Stack>

        <Typography variant="h3">{total}</Typography>
      </Box>

      <Chart
        dir="ltr"
        type="bar"
        series={[{ data: series }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}

TaskWidget.propTypes = {
  chart: PropTypes.object,
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
