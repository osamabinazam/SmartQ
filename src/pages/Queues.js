import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';

export default function PageThree() {
  const [open, setOpen] = useState(false);
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
    handleClose();
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
        <Typography variant="h3" component="div" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
            type="text"
            fullWidth
            value={queueData.startTime}
            onChange={(e) => handleInputChange(e, 'startTime')}
          />
          <TextField
            margin="dense"
            id="end-time"
            label="End Time"
            type="text"
            fullWidth
            value={queueData.endTime}
            onChange={(e) => handleInputChange(e, 'endTime')}
          />
          <TextField
            margin="dense"
            id="capacity"
            label="Capacity"
            type="text"
            fullWidth
            value={queueData.capacity}
            onChange={(e) => handleInputChange(e, 'capacity')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ border: '1px solid red', color: 'red' }}>Cancel</Button>
          <Button onClick={handleCreateQueue} color="primary" sx={{ border: '1px solid', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}>Create</Button>


        </DialogActions>
      </Dialog>
    </Page>
  );
}
