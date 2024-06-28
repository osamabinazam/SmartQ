import React from 'react';
// import { format } from 'date-fns';
import { Box, Card, Typography, Stack } from '@mui/material';
// import { fNumber } from '../../utils/formatNumber';
import { useQueue } from 'src/hooks/useQueue';

const TotalAppointments = ({ data }) => {

  const { queues } = useQueue();


  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Total Appointments</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography variant="h3">{queues.currentQueueSize + 1}</Typography>
        </Stack>
        
      </Box>
    </Card>
  );
}

export default TotalAppointments;
