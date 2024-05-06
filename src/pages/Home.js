import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
import Page from '../components/Page';
import { AppWelcome, AppNewInvoice, TotalAppointments, RemainingAppointments, AverageWaitTime, LastUpdate } from '../components/general-app';
import UpcomingAppointments from 'src/components/general-app/UpcomingAppointments';
import NotActiveQueue from './NotActiveQueue';

export default function GeneralApp() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();

  const [queueData, setQueueData] = useState({});
  const [updateTime, setUpdateTime] = useState(null);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    serviceid: '',
    startTime: '',
    endTime: ''
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
    }
    catch (error) {
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
    console.log('Creating queue with data:', formData);

    try {
      const response  = await axiosInstance.post('/api/queue/create', formData);
    }
    catch (error) {
      console.error('Failed to create queue:', error);
    }

    // Send the data to the backend
  };

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={3}>
        <AppWelcome displayName={user?.username} />
        <NotActiveQueue queueData={queueData} />
        <Grid container spacing={3}>
          {queueData.queueStatus ? (
            <>
              <Grid item xs={12} md={3}>
                <TotalAppointments data={queueData.currentQueueSize} />
              </Grid>
              <Grid item xs={12} md={3}>
                <RemainingAppointments data={queueData.remaing} />
              </Grid>
              <Grid item xs={12} md={3}>
                <AverageWaitTime data={queueData.averageServiceTime} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LastUpdate data={updateTime} />
              </Grid>
              <Grid item xs={12}>
                <UpcomingAppointments isActive={true} queueid={queueData?.queueID} />
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
              InputLabelProps={{
                shrink: true
              }}
              value={formData.startTime}
              onChange={(e) => handleInputChange(e, 'startTime')}
            />
            <TextField
              margin="dense"
              id="end-time"
              label="End Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={formData.endTime}
              onChange={(e) => handleInputChange(e, 'endTime')}
            />
            {/* <TextField
              margin="dense"
              id="capacity"
              label="Capacity"
              type="text"
              fullWidth
              value={formData.capacity}
              onChange={(e) => handleInputChange(e, 'capacity')}
            /> */}
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
