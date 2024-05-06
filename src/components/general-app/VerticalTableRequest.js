// VerticalTableRequest.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Icon, Divider } from '@mui/material';
import MoreMenuButton from './MoreMenuButton'; 
import Scrollbar from '../Scrollbar'; 
import { Link as RouterLink } from 'react-router-dom'; 
import MAvatar from '../@material-extend/MAvatar'; 

const VerticalTableRequestData = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
    queueId: 'Q123',
    date: '2024-03-30'
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    queueId: 'Q456',
    date: '2024-03-31'
  },
  // Add more data as needed
];

const VerticalTableRequest = () => {
  const handleAccept = () => {
    console.log('Accepted');
  };

  const handleDecline = () => {
    console.log('Declined');
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '16px', borderRadius: '8px', position: 'relative' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>Request for upcoming Queue</Typography>
      <TableContainer sx={{ Height: 'calc(350vh - 200px)', overflowY: 'auto', position: 'relative' }}>
        <Scrollbar sx={{ paddingRight: '8px', '&::-webkit-scrollbar': { backgroundColor: 'transparent' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Queue ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {VerticalTableRequestData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <MAvatar src={row.avatar} alt={row.name} />
                    <Typography variant="subtitle2" sx={{ marginLeft: '12px' }}>{row.name}</Typography>
                  </TableCell>
                  <TableCell>{row.queueId}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">
                    <MoreMenuButton onAccept={handleAccept} onDecline={handleDecline} />
                  </TableCell>
                </TableRow>
              ))}
             
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={'eva:arrow-ios-forward-fill'} />}
                  >
                    View All 
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
