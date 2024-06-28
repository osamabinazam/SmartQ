import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/slices/user';
import { fetchActiveQueues, fetchFutureQueues, fetchCompleteQueue } from '../redux/slices/queue';
import axiosInstance from 'src/utils/axios';

export default function PageThree() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.user.services);
  const { activeQueues, 
    // completedQueue, futureQueues 
  } = useSelector((state) => state.queue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [queueData, setQueueData] = useState({
    startTime: '',
    endTime: '',
    capacity: '',
    serviceId: ''  // Added to store the selected service ID
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    if (isAuthenticated && user?.usertype !== 'vendor') {
      navigate('/auth/401', { replace: true });
    } else {
      dispatch(fetchActiveQueues());
      dispatch(fetchFutureQueues());
      dispatch(fetchCompleteQueue());
      dispatch(getProfile());
    }
  }, [isAuthenticated, navigate, user?.usertype, dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false); // Reset loading state when dialog is closed
  };

  const handleCreateQueue = async () => {
    setLoading(true); // Set loading to true when starting the request

    const service = services.find((service) => service.serviceid === queueData.serviceId);

    const dataForBackend = {
      currentQueueSize: 0,
      averageServiceTime: 0,
      queueStartTime: queueData.startTime,
      queueEndTime: queueData.endTime,
      queueStatus: 'active',
      serviceid: service.serviceid,
      vendorprofileid: service.VendorService.vendorprofileid
    };

    console.log('Creating queue with data:', dataForBackend);

    try {
      const response = await axiosInstance.post('/api/queue/create', dataForBackend);
      console.log(response);
      handleClose();
      dispatch(fetchActiveQueues()); // Refresh the active queues
    } catch (error) {
      console.error('Failed to create queue:', error);
      setLoading(false); // Reset loading state if there's an error
    }
  };

  const handleInputChange = (e, field) => {
    setQueueData({
      ...queueData,
      [field]: e.target.value
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Returns date in 'YYYY-MM-DDTHH:mm' format
  };

  return (
    <Page title="Page Three">
      <Container maxWidth="xl">
        <Typography variant="h3" component="div" sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Queue
          <Button variant="contained" color="primary" onClick={handleOpen}>Create New</Button>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UpcomingAppointments isActive={true} appointments={activeQueues.length > 0 ? activeQueues[0].appointments : []} />
          </Grid>
          <Grid item xs={12}>
            <VerticalTable isActive={true} queueid={activeQueues.length > 0 ? activeQueues[0].queueID : null} />
          </Grid>
          <Grid item xs={12}>
            <CompleteQueue />
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Creating New Queue</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="service-label">Service Type</InputLabel>
              <Select
                labelId="service-label"
                id="serviceId"
                value={queueData.serviceId}
                onChange={(e) => handleInputChange(e, 'serviceId')}
              >
                {services.map((service) => (
                  <MenuItem key={service.serviceid} value={service.serviceid}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              id="start-time"
              label="Start Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={queueData.startTime}
              onChange={(e) => handleInputChange(e, 'startTime')}
              inputProps={{ min: getCurrentDateTime() }}
              sx={{
                mt: 2,
                '& .MuiInputBase-input': { color: 'gray' },
                '& .MuiInput-underline:before': { borderBottomColor: 'green' },
                '& .MuiInput-underline:after': { borderBottomColor: 'blue' },
              }}
            />

            <TextField
              margin="dense"
              id="end-time"
              label="End Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={queueData.endTime}
              onChange={(e) => handleInputChange(e, 'endTime')}
              inputProps={{ min: getCurrentDateTime() }}
              sx={{
                mt: 2,
                '& .MuiInputBase-input': { color: 'gray' },
                '& .MuiInput-underline:before': { borderBottomColor: 'green' },
                '& .MuiInput-underline:after': { borderBottomColor: 'blue' },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" sx={{ border: '1px solid red', color: 'red' }}>Cancel</Button>
            <Button onClick={handleCreateQueue} color="primary" disabled={loading} sx={{ border: '1px solid', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}>
              {loading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Page>
  );
}
