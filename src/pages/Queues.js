import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';

export default function PageThree() {
  const [open, setOpen] = useState(false);
  const [queueData, setQueueData] = useState({
    startTime: null,
    endTime: null,
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

  const handleInputChange = (date, field) => {
    setQueueData({
      ...queueData,
      [field]: date
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
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              label="Start Time"
              value={queueData.startTime}
              onChange={(date) => handleInputChange(date, 'startTime')}
              renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
            />
            <DesktopDatePicker
              label="End Time"
              value={queueData.endTime}
              onChange={(date) => handleInputChange(date, 'endTime')}
              renderInput={(params) => <TextField {...params} margin="dense" fullWidth />}
            />
          </LocalizationProvider>
          <TextField
            margin="dense"
            id="capacity"
            label="Capacity"
            type="text"
            fullWidth
            value={queueData.capacity}
            onChange={(e) => setQueueData({...queueData, capacity: e.target.value})}
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
