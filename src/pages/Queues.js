import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import QueueForm from './QueuesForm';
import axiosInstance from 'src/utils/axios';

export default function PageThree() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    if (isAuthenticated && user?.usertype !== 'vendor') {
      navigate('/auth/401', { replace: true });
    }


    fetchServices();
  }
    , [isAuthenticated, navigate, user.usertype]);


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
  

  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [queueData, setQueueData] = useState({
    startTime: '',
    endTime: '',
    capacity: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateQueue = () => {
    console.log('Creating queue with data:', queueData);
    // Send the data to the backend
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


        <Typography variant="h3" component="div" sx={{ mb:4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Queue
          <Button variant="contained" color="primary" onClick={handleOpen}>create new</Button>
        </Typography>


        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <UpcomingAppointments />
          </Grid>
          <Grid item xs={12} md={5}>
            <div style={{ width: '100%' }}>
              <VerticalTable />
            </div>
          </Grid>
          <Grid item xs={12}>
            <CompleteQueue />
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Creating New Queue</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="start-time"
            label="Start Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{
              shrink: true,  // This property is needed to ensure the label doesn't overlap with the selected value
            }}
            value={queueData.startTime}
            onChange={(e) => handleInputChange(e, 'startTime')}
            sx={{
              mt: 2,
              color: 'text.primary',
              '& .MuiInputBase-input': {
                color: 'gray', // Gray type color for text
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'green', // Green color for border
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'blue', // Blue color for border when selected
              },
            }}
          />

          <TextField
            margin="dense"
            id="end-time"
            label="End Time"
            type="datetime-local"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={queueData.endTime}
            onChange={(e) => handleInputChange(e, 'endTime')}
            sx={{
              mt: 2,
              color: 'text.primary',
              '& .MuiInputBase-input': {
                color: 'gray', // Gray type color for text
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'green', // Green color for border
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'blue', // Blue color for border when selected
              },
            }}
          />
          {/* <TextField
            margin="dense"
            id="capacity"
            label="Capacity"
            type="text"
            fullWidth
            value={queueData.capacity}
            onChange={(e) => handleInputChange(e, 'capacity')}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ border: '1px solid red', color: 'red' }}>Cancel</Button>
          <Button onClick={handleCreateQueue} color="primary" sx={{ border: '1px solid', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}>Create</Button>


        </DialogActions>
      </Dialog>
    </Page>
  );
}
