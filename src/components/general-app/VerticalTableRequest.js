import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Icon, Divider } from '@mui/material'; // Import Button component
import MoreMenuButton from './MoreMenuButton'; 
import Scrollbar from '../Scrollbar'; 
import { Link as RouterLink } from 'react-router-dom'; 
import MAvatar from '../@material-extend/MAvatar'; // Import MAvatar component

const VerticalTableRequestData = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/static/mock-images/avatars/avatar_1.jpg', // Add avatar URL
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/static/mock-images/avatars/avatar_2.jpg', // Add avatar URL
  },
  {
    id: '3',
    name: 'Jane',
    avatar: '/static/mock-images/avatars/avatar_3.jpg', // Add avatar URL
  },
  {
    id: '4',
    name: 'Smith',
    avatar: '/static/mock-images/avatars/avatar_4.jpg', // Add avatar URL
  },
];

const VerticalTableRequest = () => {
  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '16px', borderRadius: '8px', position: 'relative' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>Request for upcoming Queue</Typography>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', position: 'relative' }}>
        <Scrollbar sx={{ paddingRight: '8px', '&::-webkit-scrollbar': { backgroundColor: 'transparent' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {VerticalTableRequestData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Use MAvatar component with the avatar URL */}
                    <MAvatar src={row.avatar} alt={row.name} />
                    <Typography variant="subtitle2" sx={{ marginLeft: '12px' }}>{row.name}</Typography>
                  </TableCell>
                 
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
              ))}
             
              <TableRow>
                <TableCell colSpan={2}>
                  <Divider sx={{ width: '100%' }} />
                </TableCell>
              </TableRow>
            
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={'eva:arrow-ios-forward-fill'} />}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }} 
                  >
                    View All  &gt;
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Box>
  );
};

export default VerticalTableRequest;
