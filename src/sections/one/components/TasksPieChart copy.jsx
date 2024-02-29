// import PropTypes from 'prop-types';
// import Chart from 'react-apexcharts';
// import { useState, useEffect, useCallback } from 'react';

// import { Card, Stack, Typography } from '@mui/material';

// import { colours } from './utils';
// import useFilter from './useFilter';
// import ResetButton from './ResetButton';
// import { filterByTask } from './filters';

// const TasksPieChart = ({ taskElementsCount = 10 }) => {
//   const { data, applyFilter, removeFilterFromComp, canReset } = useFilter();
//   // const data = useTaskStore((state) => state.data);
//   const [chartData, setChartData] = useState(() => processTaskPieData(data, taskElementsCount));

//   const handleClick = useCallback(
//     (_event, _chartContext, config) => {
//       if (!canReset) {
//         const { dataPointIndex } = config;
//         const task = chartData[dataPointIndex].x;
//         if (task === 'Other') return;
//         applyFilter(filterByTask(task));
//       }
//     },
//     [canReset, chartData, applyFilter]
//   );

//   const initialOptions = {
//     labels: [],
//     chart: {
//       events: {
//         dataPointSelection: null,
//       },
//     },
//     plotOptions: {
//       expandOnClick: false,
//     },
//     colors: [
//       function colorFunction({ value, seriesIndex, dataPointIndex, w }) {
//         return colours[colours.length - seriesIndex - 1];
//       },
//     ],
//   };

//   const [options, setOptions] = useState(initialOptions);

//   useEffect(() => {
//     const processedData = processTaskPieData(data, taskElementsCount);
//     setChartData(processedData);
//     setOptions((prev) => ({
//       ...prev,
//       labels: processedData.map((item) => item.x),
//       chart: {
//         events: {
//           dataPointSelection: canReset ? null : handleClick,
//         },
//       },
//     }));
//   }, [data, taskElementsCount, canReset, handleClick]);

//   return (
//     <Card sx={{ width: '100%' }}>
//       <Stack direction="row" spacing={2} sx={{ m: 2 }}>
//         <Typography variant="h4">Tasks</Typography>
//         {canReset && <ResetButton handleReset={removeFilterFromComp} />}
//       </Stack>
//       <Chart options={options} series={chartData.map((item) => item.y)} type="pie" width="600" />
//     </Card>
//   );
// };

// export default TasksPieChart;
// TasksPieChart.propTypes = {
//   taskElementsCount: PropTypes.number,
// };

// function processTaskPieData(data, taskElementsCount) {
//   const taskCounts = {};

//   data.forEach((task) => {
//     const { Task } = task;
//     taskCounts[Task] = taskCounts[Task] ? taskCounts[Task] + 1 : 1;
//   });

//   const sortedTasks = Object.entries(taskCounts)
//     .sort(([, countA], [, countB]) => countB - countA)
//     .slice(0, taskElementsCount);

//   const otherCount = Object.entries(taskCounts)
//     .slice(taskElementsCount)
//     .reduce((acc, [, count]) => acc + count, 0);

//   const chartData =
//     otherCount === 0
//       ? [...sortedTasks.map(([task, count]) => ({ x: task, y: count }))]
//       : [
//           ...sortedTasks.map(([task, count]) => ({ x: task, y: count })),
//           { x: 'Other', y: otherCount },
//         ];
//   return chartData;
// }
