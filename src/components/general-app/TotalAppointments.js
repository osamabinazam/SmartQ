import React from 'react';
import { format } from 'date-fns';
import { Box, Card, Typography, Stack } from '@mui/material';
import { fNumber } from '../../utils/formatNumber';

const QUEUE_ID = 18765;

const TotalAppointments = ({ data }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Appointments</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography variant="h3">{data}</Typography>
        </Stack>
        
      </Box>
    </Card>
  );
}

export default TotalAppointments;
