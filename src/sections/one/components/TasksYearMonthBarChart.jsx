import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';

import { Card, Stack, Typography } from '@mui/material';

import useFilter from './useFilter';
import ResetButton from './ResetButton';
import { groupTasksByMonth } from './utils';
import { filterByMonthAndYear } from './filters';

function TasksYearMonthBarChart() {
  const [series, setSeries] = useState([]);
  const [selectedDataPointIndex, setSelectedDataPointIndex] = useState(null);
  const {
    data: extern,
    applyFilter: applyFilterForComponent,
    removeFilterFromComp,
    canReset,
  } = useFilter();

  const [data, setData] = useState(() => extern);
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = (_event, _chartContext, config) => {
    setHasClicked(true);
    const { dataPointIndex } = config;
    setSelectedDataPointIndex(dataPointIndex);
    const monthToFilter = Object.keys(groupTasksByMonth(data))[dataPointIndex];
    const [month, year] = monthToFilter.split('/');
    applyFilterForComponent(filterByMonthAndYear(month, year));
  };

  useEffect(() => {
    if (!hasClicked) {
      setData(() => extern);
    }
  }, [hasClicked, extern]);

  const initialOptions = {
    chart: {
      type: 'bar',
      height: 350,
      events: {
        dataPointSelection: handleClick,
      },
    },
  };
  const [options, setOptions] = useState(initialOptions);
  useEffect(() => {
    const groupedTasks = groupTasksByMonth(data);
    const categories = Object.keys(groupedTasks);

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories,
      },
    }));

    const seriesData = Object.values(groupedTasks);
    setSeries([{ name: 'Tasks', data: seriesData }]);
  }, [data, selectedDataPointIndex]);

  return (
    <Card>
      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Typography variant="h4"> Tasks By Year And Month</Typography>
        {canReset && (
          <ResetButton
            handleReset={() => {
              removeFilterFromComp();
              setSelectedDataPointIndex(null);
              setHasClicked(false);
            }}
          />
        )}
      </Stack>
      <Chart options={options} series={series} type="bar" height={350} />
    </Card>
  );
}

export default TasksYearMonthBarChart;
