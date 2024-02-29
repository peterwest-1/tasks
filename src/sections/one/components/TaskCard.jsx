import React from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, CardContent } from '@mui/material';

const TaskCard = ({ title, number }) => (
  <Card sx={{ minWidth: 300 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
        {number}
      </Typography>
    </CardContent>
  </Card>
);

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export default TaskCard;
