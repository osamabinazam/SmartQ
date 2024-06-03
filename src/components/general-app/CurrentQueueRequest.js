import React, { useState, useEffect } from 'react';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Divider, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Scrollbar from '../Scrollbar';
import MAvatar from '../@material-extend/MAvatar';
import axios from 'axios';
import axiosInstance from 'src/utils/axios';
import { useQueue } from 'src/hooks/useQueue';

const CurrentQueueRequest = () => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { queues } = useQueue();



  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.post('/api/request/queue', {
          queueid: queues.queueID // Ensure the correct property name
        });
        // Initialize status field if it doesn't exist
        const requestsWithStatus = response.data.map(request => ({
          ...request,
          status: request.status || '' // Ensure status is initialized
        }));
        setData(requestsWithStatus);
        console.log(response)
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    };

    if (queues.queueID) { // Ensure the queueID is available before making the request
      fetchRequests();
    }
  }, [queues.queueID, queues]);

  const handleAccept = async (id) => {
    const selectedRequest = data.find(item => item.requestID === id);
    const appointmentData = {
      appointmentDateTime: new Date().toISOString(),
      appointmentStatus: 'scheduled',
      customerprofileid: selectedRequest.customerprofileid,
      vendorprofileid: selectedRequest.vendorprofileid,
      serviceid: selectedRequest.serviceid,
      queueid: selectedRequest.queueid
    };

    try {
      const response = await axiosInstance.post('/api/appointment/create', appointmentData);
      if (response.status === 200) {
        const updatedData = data.map(item => {
          if (item.requestID === id) {
            return { ...item, status: 'Accepted' };
          }
          return item;
        });
        setData(updatedData);
      }

      const requestResponse = await axiosInstance.delete(`/api/request/${id}`);
      if (requestResponse.status === 200) {
        console.log('Request deleted successfully');
      }

      const responseRequestQueue = await axiosInstance.post('/api/request/queue', {
        queueid: queues.queueID // Ensure the correct property name
      });
      // Initialize status field if it doesn't exist
      const requestsWithStatus = responseRequestQueue.data.map(request => ({
        ...request,
        status: request.status || '' // Ensure status is initialized
      }));
      setData(requestsWithStatus);

  } catch (error) {
    console.error('Failed to accept request:', error);
  }

};

const handleDecline = (id) => {
  const updatedData = data.map(item => {
    if (item.requestID === id) {
      return { ...item, status: 'Declined' };
    }
    return item;
  });
  setData(updatedData);
};

const handleOpenModal = () => {
  setModalOpen(true);
};

const handleCloseModal = () => {
  setModalOpen(false);
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
              {data.slice(0, 10).map((row) => (
                <TableRow key={row.requestID} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MAvatar src={row.customer_profile?.avatar} alt={row.customer_profile?.firstname} />
                      <Typography variant="subtitle2" sx={{ ml: 2, color: 'text.primary' }}>
                        {row.customer_profile?.firstname} {row.customer_profile?.lastname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.service?.name}</TableCell>
                  <TableCell>{new Date(row.requestDateTime).toLocaleTimeString()}</TableCell>
                  <TableCell align="right">
                    {row.status === '' && (
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size="small" sx={{ mr: 1 }} variant="contained" color="success" onClick={() => handleAccept(row.requestID)}>
                          Accept
                        </Button>
                        <Button size="small" variant="contained" color="error" onClick={() => handleDecline(row.requestID)}>
                          Decline
                        </Button>
                      </Box>
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
          size="small"
          color="inherit"
          disabled={data.length <= 10}
          onClick={handleOpenModal}
        >
          View All
        </Button>
      </Box>
    </Card>

    <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
      <DialogTitle>All Requests</DialogTitle>
      <DialogContent>
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
                  <TableRow key={row.requestID} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MAvatar src={row.customer_profile?.avatar} alt={row.customer_profile?.firstname} />
                        <Typography variant="subtitle2" sx={{ ml: 2, color: 'text.primary' }}>
                          {row.customer_profile?.firstname} {row.customer_profile?.lastname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.service?.name}</TableCell>
                    <TableCell>{new Date(row.requestDateTime).toLocaleTimeString()}</TableCell>
                    <TableCell align="right">
                      {row.status === '' && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button size="small" sx={{ mr: 1 }} variant="contained" color="success" onClick={() => handleAccept(row.requestID)}>
                            Accept
                          </Button>
                          <Button size="small" variant="contained" color="error" onClick={() => handleDecline(row.requestID)}>
                            Decline
                          </Button>
                        </Box>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>
);
}

export default CurrentQueueRequest;
