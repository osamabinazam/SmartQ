import React from 'react';
import { Box, Card, Typography, Stack } from '@mui/material';
// import { fNumber } from '../../utils/formatNumber';

// const SERVED_CUSTOMERS = 4876;

export default function RemaingAppointments( {data}) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Remaining Appointments</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
        <Typography variant="h3">{data}</Typography>
        </Stack>
        
      </Box>
    </Card>
  );
}
