import { useState, useEffect } from 'react';

import { Stack, Button } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';

import TaskWidget from './TasksWidget';
import { groupTasksByMonth } from './utils';
import useTaskStore from '../store/task-store';
import useFilterStore from '../store/filter-store';
import useDateStore from '../store/date-range-store';

const TasksStats = () => {
  const data = useTaskStore((state) => state.data);
  const applyFilters = useTaskStore((state) => state.applyFilters);

  const dateRange = useDateStore((state) => state.dateRange);
  const setDateRange = useDateStore((state) => state.setDateRange);
  const resetDateRange = useDateStore((state) => state.resetDateRange);

  const clearFilters = useFilterStore((state) => state.clearFilters);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleReset = () => {
    clearFilters();
    resetDateRange();
    applyFilters();
  };
  const [tasksData, setTasksData] = useState({ length: 0, chartData: [] });
  const [completedTasksData, setCompletedTasksData] = useState({ length: 0, chartData: [] });
  const [activeTasksData, setActiveTasksData] = useState({ length: 0, chartData: [] });

  useEffect(() => {
    setTasksData(() => ({
      length: data.length,
      chartData: Object.values(groupTasksByMonth(data)),
    }));
    setCompletedTasksData(() => {
      const filtered = data.filter((a) => a.Status === 'completed');
      return {
        length: filtered.length,
        chartData: Object.values(groupTasksByMonth(filtered)),
      };
    });
    setActiveTasksData(() => {
      const filtered = data.filter((a) => a.Status !== 'completed');
      return {
        length: filtered.length,
        chartData: Object.values(groupTasksByMonth(filtered)),
      };
    });
  }, [data]);

  return (
    <Stack spacing={2} sx={{ m: 2 }} direction="row">
      <TaskWidget
        title="Total Number of Tasks"
        total={tasksData.length}
        percent={0}
        chart={{
          series: tasksData.chartData,
        }}
      />
      <TaskWidget
        title="Total Number of Completed Tasks"
        total={completedTasksData.length}
        percent={0}
        chart={{
          series: completedTasksData.chartData,
        }}
      />
      <TaskWidget
        title="Total Number of Active Tasks"
        total={activeTasksData.length}
        percent={0}
        chart={{
          series: activeTasksData.chartData,
        }}
      />
      <Stack spacing={2} sx={{ m: 2 }} direction="column">
        <DateRangePicker value={dateRange} onChange={handleDateChange} defaultValue={dateRange} />
        <Button sx={{ border: '1px solid #dddddd' }} onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default TasksStats;
