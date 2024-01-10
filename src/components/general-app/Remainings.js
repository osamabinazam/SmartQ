
import { Box, Card, Typography, Stack } from '@mui/material';

import { fNumber} from '../../utils/formatNumber';

const REMAINING_CUSTOMERS = 678;

export default function Remainings() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Remaining</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography variant="span" color={'text.secondary'}>
            Average Time: 40 minutes
          </Typography>
         
        </Stack>

        <Typography variant="h3">{fNumber(REMAINING_CUSTOMERS)}</Typography>
      </Box>
    </Card>
  );
}
