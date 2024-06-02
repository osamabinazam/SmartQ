import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import axiosInstance from 'src/utils/axios';

export default function PageThree() {



  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
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
      fetchServices();
    }
  }, [isAuthenticated, navigate, user?.usertype]);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get('/api/service/vendor-services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateQueue = async () => {

    // get service id from services
    const service = services.find((service) => service.serviceid === queueData.serviceId);

    const dataForBackend = {
      currentQueueSize:0,
      averageServiceTime:0,
      queueStartTime:queueData.startTime,
      queueEndTime: queueData.endTime,
      queueStatus: 'active',
      serviceid: service.serviceid,
      vendorprofileid: service.vendorprofileid
    }

    console.log('Creating queue with data:', dataForBackend);

    try {
      const response  = await axiosInstance.post('/api/queue/create', dataForBackend);
      console.log(response)
    }
    catch (error) {
      console.error('Failed to create queue:', error);
    }
  };

  const handleInputChange = (e, field) => {
    setQueueData({
      ...queueData,
      [field]: e.target.value
    });
  };

  return (
    <Page title="Page Three">
      <Container maxWidth="xl">
        <Typography variant="h3" component="div" sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Queue
          <Button variant="contained" color="primary" onClick={handleOpen}>Create New</Button>
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <UpcomingAppointments />
          </Grid>
          <Grid item xs={12} md={5}>
            <VerticalTable />
          </Grid>
          <Grid item xs={12}>
            <CompleteQueue />
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Creating New Queue</DialogTitle>
          <DialogContent>
            {/* Dropdown for Service Selection */}
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
            <Button onClick={handleCreateQueue} color="primary" sx={{ border: '1px solid', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}>Create</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Page>
  );
}
