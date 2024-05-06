
import { Box, Card, Typography, Stack } from '@mui/material';


import data from '@iconify/icons-eva/arrow-ios-upward-fill';


export default function LastUpdate({data}) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Last Update</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          
        <Typography variant="h3">{data}</Typography>
          <Typography variant="span" color={'text.secondary'}>
            minutes ago
          </Typography>
         
        </Stack>

        
      </Box>
    </Card>
  );
}
