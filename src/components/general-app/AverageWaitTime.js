
import { Box, Card, Typography, Stack } from '@mui/material';

import { fNumber} from '../../utils/formatNumber';

const REMAINING_CUSTOMERS = 678;

export default function AverageWaitTime({data}) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Average Wait Time</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
         
        <Typography variant="h3">{data} </Typography>
        <Typography variant="span" color={'text.secondary'}>
           minutes
          </Typography>
         
        </Stack>

      </Box> 
    </Card>
  );
}
