import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
import Page from '../components/Page';
import { AppWelcome, AppNewInvoice, TotalAppointments, RemainingAppointments, AverageWaitTime, LastUpdate } from '../components/general-app';
import UpcomingAppointments from 'src/components/general-app/UpcomingAppointments';
import NotActiveQueue from './NotActiveQueue';
import { useQueue } from 'src/hooks/useQueue';

export default function GeneralApp() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();

  const { queues } = useQueue();

  const [queueData, setQueueData] = useState({});
  const [updateTime, setUpdateTime] = useState(null);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [formData, setFormData] = useState({
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
    }

    fetchQueueData();
    fetchServices();
  }, [isAuthenticated, navigate, user?.usertype]);

  const fetchQueueData = async () => {
    try {
      const startTime = new Date();
      const response = await axiosInstance.get('/api/queue');
      const endTime = new Date();
      setQueueData(response.data);

      const timeElapsed = endTime - startTime;
      const minutesElapsed = Math.floor(timeElapsed / (1000 * 60));
      setUpdateTime(minutesElapsed);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get('/api/service/vendor-services');
      console.log('Services:', response.data);  
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
    setLoading(false); // Reset loading state when dialog is closed
  };

  const handleCreateQueue = async () => {
    setLoading(true); // Set loading to true when starting the request

    const vendorResponse = await axiosInstance.get('/api/profle/vendor/vendor-by-userid', );
    const service = services.find((service) => service.serviceid === formData.serviceId);

    const dataForBackend = {
      currentQueueSize: 0,
      averageServiceTime: 0,
      queueStartTime: formData.startTime,
      queueEndTime: formData.endTime,
      queueStatus: 'active',
      serviceid: service.serviceid,
      vendorprofileid: service.vendorprofileid
    };

    console.log('Creating queue with data:', dataForBackend);

    try {
      const response  = await axiosInstance.post('/api/queue/create', dataForBackend);
      console.log(response);
      handleClose();
    } catch (error) {
      console.error('Failed to create queue:', error);
      setLoading(false); // Reset loading state if there's an error
    }
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Returns date in 'YYYY-MM-DDTHH:mm' format
  };

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={3}>
        <AppWelcome displayName={user?.username} />
        <NotActiveQueue queueData={queues} />
        <Grid container spacing={3}>
          {queues.queueStatus ? (
            <>
              <Grid item xs={12} md={3}>
                <TotalAppointments />
              </Grid>
              <Grid item xs={12} md={3}>
                <RemainingAppointments data={queues.remaing} />
              </Grid>
              <Grid item xs={12} md={3}>
                <AverageWaitTime data={queues.averageServiceTime} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LastUpdate data={queues.updateAt} />
              </Grid>
              <Grid item xs={12}>
                <UpcomingAppointments isActive={true} queueid={queues?.queueID} />
              </Grid>
              <Grid item xs={12}>
                <AppNewInvoice />
              </Grid>
            </>
          ) : (
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', mb: 5 }}>
              <Button to="/" size="large" variant="contained" onClick={handleOpen} sx={{ mt: 5, textAlign: 'center' }}>
                Create Queue
              </Button>
            </Box>
          )}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Creating New Queue</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <InputLabel id="serviceid-label">Service Type</InputLabel>
              <Select
                labelId="serviceid-label"
                id="serviceid"
                value={formData.serviceid}
                label="Service Type"
                onChange={(e) => handleInputChange(e, 'serviceid')}
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
              value={formData.startTime}
              onChange={(e) => handleInputChange(e, 'startTime')}
              inputProps={{ min: getCurrentDateTime() }}
            />

            <TextField
              margin="dense"
              id="end-time"
              label="End Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.endTime}
              onChange={(e) => handleInputChange(e, 'endTime')}
              inputProps={{ min: getCurrentDateTime() }}
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
