import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';

import { Card, Stack, Typography } from '@mui/material';

import { colours } from './utils';
import useFilter from './useFilter';
import ResetButton from './ResetButton';
import { filterByTask } from './filters';

const TasksPieChart = ({ taskElementsCount = 10 }) => {
  const { data: extern, applyFilter, removeFilterFromComp, canReset } = useFilter();
  const [data, setData] = useState(() => extern);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (!hasClicked) {
      setData(() => extern);
    }
  }, [hasClicked, extern]);

  const [processedData, setProcessedData] = useState(() =>
    processTaskPieData(data, taskElementsCount)
  );

  const [series, setSeries] = useState([]);

  const handleClick = (_event, _chartContext, config) => {
    setHasClicked(true);
    const { dataPointIndex } = config;
    const task = processedData[dataPointIndex].x;
    if (task === 'Other') return;
    applyFilter(filterByTask(task));
  };
  const initialOptions = {
    chart: {
      events: {
        dataPointSelection: handleClick,
      },
    },
    colors: [
      function colorFunction({ value, seriesIndex, dataPointIndex, w }) {
        return colours[colours.length - seriesIndex - 1];
      },
    ],
  };
  const [options, setOptions] = useState(initialOptions);
  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      labels: processedData.map((item) => item.x),
    }));
  }, [processedData]);

  useEffect(() => {
    const pieChartData = processTaskPieData(data, taskElementsCount);
    setProcessedData(pieChartData);
    setSeries(pieChartData.map((item) => item.y));
  }, [data, canReset, taskElementsCount]);

  useEffect(() => {
    setSeries(processedData.map((item) => item.y));
  }, [processedData]);

  return (
    <Card sx={{ width: '100%' }}>
      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Typography variant="h4">Tasks</Typography>
        {canReset && (
          <ResetButton
            handleReset={() => {
              removeFilterFromComp();
              setHasClicked(false);
            }}
          />
        )}
      </Stack>
      <Chart options={options} series={series} type="pie" width="600" />
    </Card>
  );
};

export default TasksPieChart;
TasksPieChart.propTypes = {
  taskElementsCount: PropTypes.number,
};

function processTaskPieData(data, taskElementsCount) {
  const taskCounts = {};

  data.forEach((task) => {
    const { Task } = task;
    taskCounts[Task] = taskCounts[Task] ? taskCounts[Task] + 1 : 1;
  });

  const sortedTasks = Object.entries(taskCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, taskElementsCount);

  const otherCount = Object.entries(taskCounts)
    .slice(taskElementsCount)
    .reduce((acc, [, count]) => acc + count, 0);

  const chartData =
    otherCount === 0
      ? [...sortedTasks.map(([task, count]) => ({ x: task, y: count }))]
      : [
          ...sortedTasks.map(([task, count]) => ({ x: task, y: count })),
          { x: 'Other', y: otherCount },
        ];
  return chartData;
}
