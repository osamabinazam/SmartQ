import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
import Page from '../components/Page';
import { AppWelcome, AppNewInvoice, TotalAppointments, RemainingAppointments, AverageWaitTime, LastUpdate } from '../components/general-app';
import UpcomingAppointments from 'src/components/general-app/UpcomingAppointments';
import NotActiveQueue from './NotActiveQueue';
import CurrentRunningAppointment from 'src/components/general-app/CurrentRunningAppointment';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/slices/user';
import { fetchActiveQueues, fetchFutureQueues, fetchCompleteQueue } from '../redux/slices/queue';

export default function GeneralApp() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.user.services);
  const { activeQueues } = useSelector((state) => state.queue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startTime: '',
    endTime: '',
    capacity: '',
    serviceid: ''
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    if (isAuthenticated && user?.usertype !== 'vendor') {
      navigate('/auth/401', { replace: true });
    }

    dispatch(fetchActiveQueues());
    dispatch(fetchFutureQueues());
    dispatch(fetchCompleteQueue());
    dispatch(getProfile());
  }, [isAuthenticated, navigate, user?.usertype, dispatch]);

  useEffect(() => {
    if (activeQueues.length > 0) {
      setAppointments(activeQueues[0].appointments);
    }
  }, [activeQueues]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const handleCreateQueue = async () => {
    setLoading(true);
    const service = services.find((service) => service.serviceid === formData.serviceid);

    const dataForBackend = {
      currentQueueSize: 0,
      averageServiceTime: 0,
      queueStartTime: formData.startTime,
      queueEndTime: formData.endTime,
      queueStatus: 'active',
      serviceid: service.serviceid,
      vendorprofileid: service.VendorService.vendorprofileid
    };

    try {
      await axiosInstance.post('/api/queue/create', dataForBackend);
      handleClose();
      dispatch(fetchActiveQueues());
    } catch (error) {
      console.error('Failed to create queue:', error);
      setLoading(false);
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
    return now.toISOString().slice(0, 16);
  };

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={5}>
        <AppWelcome displayName={user?.username} />
        <NotActiveQueue queueData={activeQueues[0]} />
        <Grid container spacing={3}>
          {activeQueues.length > 0 ? (

            
            <>
             
              <Grid item xs={12} md={3}>
                <TotalAppointments />
              </Grid>
              <Grid item xs={12} md={3}>
                <RemainingAppointments data={activeQueues[0].remaing} />
              </Grid>
              <Grid item xs={12} md={3}>
                <AverageWaitTime data={activeQueues[0].averageServiceTime} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LastUpdate data={activeQueues[0].updatedAt} />
              </Grid>
          
              

              <Grid item xs={12} md={9}>
                <UpcomingAppointments isActive={true} appointments={appointments} setAppointments={setAppointments} />
              </Grid>
              <Grid item xs={12} md={3}>
                <CurrentRunningAppointment appointments={appointments} setAppointments={setAppointments} />
              </Grid>

              <Grid item xs={12}>
                <AppNewInvoice />
              </Grid>
            </>
          ) : (
            <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', mb: 5 }}>
              <Button size="large" variant="contained" onClick={handleOpen} sx={{ mt: 5, textAlign: 'center' }}>
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
