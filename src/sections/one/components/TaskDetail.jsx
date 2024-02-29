import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Box, Stack, CardHeader } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';

import ProfileCover from './ProfileCover';

// eslint-disable-next-line react/prop-types
export default function TaskDetail({ id }) {
  const settings = useSettingsContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: task } = await axios.get(`https://wb3.netlify.app/api/tasks?id=${id}`);
        setData(task);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Card
        sx={{
          my: 3,
          height: 290,
        }}
      >
        <ProfileCover role={data.Task} name={data?.Customer} avatarUrl={data.avatarUrl} />
      </Card>
      <Card>
        <CardHeader title="Task Detail" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ typography: 'body2' }}>Complete Date:{data.DateCompleted}</Box>
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            Customer: {data.Customer}
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            TaskId: {data.TaskId}
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            Task By: {data.TaskBy}
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            Weather: {data.weather}
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            Reviewer: {data.reviewer}
          </Stack>
          <Stack direction="row" sx={{ typography: 'body2' }}>
            Task: {data.Task}
          </Stack>
          <Stack direction="row" spacing={2}>
            <Box sx={{ typography: 'body2' }}>Status: {data.Status}</Box>
          </Stack>
          {/* <Stack direction="row" spacing={2}>
            <Button
              onClick={() => router.back()}
              color="success" variant="outlined" size="small">
              Back to home
            </Button>
          </Stack> */}
        </Stack>
      </Card>
    </Container>
  );
}
