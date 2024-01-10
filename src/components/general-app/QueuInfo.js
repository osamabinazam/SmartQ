
import { format } from 'date-fns';
import { Box, Card, Typography, Stack } from '@mui/material';
import { fNumber } from '../../utils/formatNumber';


const QUEUE_ID = 18765;

export default function QueueInfo() {

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Queue ID</Typography>
         <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography variant="span" color={'text.secondary'}>Start at: {format(new Date(1627556329038),'p')}</Typography>
          
        </Stack> 

        <Typography variant="h3">{fNumber(QUEUE_ID)}</Typography>
      </Box>
    </Card>
  );
}
