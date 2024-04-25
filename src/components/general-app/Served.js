import React from 'react';
import { Box, Card, Typography, Stack } from '@mui/material';
import { fNumber } from '../../utils/formatNumber';

const SERVED_CUSTOMERS = 4876;

export default function Served() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">End Time</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography variant="span" color={'text.secondary'}>Time: 1 hour 20 minutes</Typography>
        </Stack>
        <Typography variant="h3">{fNumber(SERVED_CUSTOMERS)}</Typography>
      </Box>
    </Card>
  );
}
