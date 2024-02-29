import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';

import useTaskStore from './store/task-store';
import TasksStats from './components/TasksStats';
import TasksTable from './components/table/TasksTable';
import TasksPieChart from './components/TasksPieChart';
import TaskCustomerBar from './components/customer-bar/TaskCustomerBar';
import TasksYearMonthBarChart from './components/TasksYearMonthBarChart';

export default function OneView() {
  const settings = useSettingsContext();

  const [loading, setLoading] = useState(true);

  const setOriginalData = useTaskStore((state) => state.setOriginalData);
  const applyFilters = useTaskStore((state) => state.applyFilters);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://wb3.netlify.app/api/tasks');
      if (res.status === 200) {
        setOriginalData(res.data);
        applyFilters();
        setLoading(false);
      }
    };
    fetchData();
  }, [setOriginalData, applyFilters]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Tasks </Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <TasksStats />

        <Stack direction="row" spacing={2} sx={{ m: 2 }}>
          <TasksPieChart />
          <TaskCustomerBar />
        </Stack>

        <TasksYearMonthBarChart />
        <TasksTable />
      </Box>
    </Container>
  );
}
