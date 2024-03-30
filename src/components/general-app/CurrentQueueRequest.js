import React, { useState } from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Divider, CardHeader } from '@mui/material';
import Scrollbar from '../Scrollbar';
import MAvatar from '../@material-extend/MAvatar'; // Import MAvatar component
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Link as RouterLink } from 'react-router-dom';

const CurrentQueueRequestMockData = [
  {
    id: '1',
    name: 'Simran Waswani',
    service: 'Urologist',
    time: '09:00 AM',
    avatar: '/static/mock-images/avatars/avatar_1.jpg', // Add avatar URL
    status: ''
  },
  {
    id: '2',
    name: 'Shafique Ahmed',
    service: 'Gynecologist',
    time: '10:00 AM',
    avatar: '/static/mock-images/avatars/avatar_2.jpg', // Add avatar URL
    status: ''
  }
];

export default function CurrentQueueRequest() {
  const [data, setData] = useState(CurrentQueueRequestMockData);

  const handleAccept = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Accepted' };
      }
      return item;
    });
    setData(updatedData);
  };

  const handleDecline = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Declined' };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <>
      <Card>
        <CardHeader title="Request for Current Queue" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MAvatar src={row.avatar} alt={row.name} />
                        <Typography variant="subtitle2" sx={{ marginLeft: '12px', color: 'text.primary' }}>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell align="right">
                      {row.status === '' && (
                        <>
                          <Button size="small" sx={{ mr: 1 }} variant="contained" color="success" onClick={() => handleAccept(row.id)}>
                            Accept
                          </Button>
                          <Button size="small" variant="contained" color="error" onClick={() => handleDecline(row.id)}>
                            Decline
                          </Button>
                        </>
                      )}
                      {row.status === 'Accepted' && (
                        <Typography variant="body2" color="success.main">
                          Accepted
                        </Typography>
                      )}
                      {row.status === 'Declined' && (
                        <Typography variant="body2" color="error.main">
                          Declined
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
