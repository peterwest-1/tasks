import React from 'react';

import { Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ResetButton = ({ handleReset }) => (
  <Button sx={{ border: '1px solid #dddddd', marginLeft: 'auto' }} onClick={handleReset}>
    Reset
  </Button>
);

export default ResetButton;
