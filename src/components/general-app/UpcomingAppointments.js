import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Button, Card, 
  // CardHeader, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Menu, MenuItem, Avatar, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, CircularProgress
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from 'src/utils/axios';

const UpcomingAppointments = ({ isActive, appointments = [], queues = [] }) => {
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [anchorEl, setAnchorEl] = useState({});
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appointmentFormData, setAppointmentFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    queueId: '',
    serviceId: '',
    vendorprofileid: ''
  });

  useEffect(() => {
    if (!isActive) {
      setCurrentAppointments([]);
      return;
    }

    const scheduledAppointments = appointments.filter(appointment => appointment.appointmentStatus === 'scheduled');
    setCurrentAppointments(scheduledAppointments);

  }, [isActive, appointments]);

  const handleOpenAppointmentDialog = () => {
    setAppointmentOpen(true);
  };

  const handleCloseAppointmentDialog = () => {
    setAppointmentOpen(false);
    setLoading(false);
  };

  const handleCreateAppointment = async () => {
    setLoading(true);

    const appointmentData = {
      ...appointmentFormData,
      appointmentStatus: 'scheduled'
    };

    try {
      await axiosInstance.post('/api/appointment/create', appointmentData);
      handleCloseAppointmentDialog();
      // Update the appointments list here if necessary
    } catch (error) {
      console.error('Failed to create appointment:', error);
      setLoading(false);
    }
  };

  const handleAppointmentInputChange = (e, field) => {
    setAppointmentFormData({
      ...appointmentFormData,
      [field]: e.target.value
    });
  };

  const handleCloseMenu = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const handleDownload = (row) => {
    const { customer_profile, appointmentDateTime, service } = row;
    const formattedDate = format(new Date(appointmentDateTime), 'dd MMM yyyy p');
    const dataToDownload = `Customer: ${customer_profile.firstname} ${customer_profile.lastname}\nTime: ${formattedDate}\nService Type: ${service.name}\nPrice: ${service.price}`;
    const blob = new Blob([dataToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointment_details.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = (row) => {
    if (navigator.share) {
      const { customer_profile, service } = row;
      navigator.share({
        title: 'Appointment Details',
        text: `Customer: ${customer_profile.firstname} ${customer_profile.lastname}, Service Type: ${service.name}`,
      }).then(() => {
        console.log('Data shared successfully');
      }).catch((error) => {
        console.error('Error sharing data:', error);
      });
    } else {
      console.log('Web Share API not supported');
    }
  };

  const handleDelete = (row) => {
    const updatedRows = currentAppointments.filter(r => r.appointmentID !== row.appointmentID);
    setCurrentAppointments(updatedRows);
  };

  return (
    <Card>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Typography variant="h6">Current Appointments</Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAppointmentDialog}>Create New</Button>
      </Box>
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Service Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAppointments && currentAppointments.length > 0 ? (
              currentAppointments.map((row) => (
                <TableRow key={row.appointmentID}>
                  <TableCell>
                    <Avatar src={row.customer_profile?.avatar || '/static/mock-images/avatars/avatar_default.jpg'} />
                    {`${row.customer_profile?.firstname} ${row.customer_profile?.lastname}`}
                  </TableCell>
                  <TableCell>{format(new Date(row.appointmentDateTime), 'dd MMM yyyy p')}</TableCell>
                  <TableCell>{row.service?.name}</TableCell>
                  <TableCell>{row.service?.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls={`menu-${row?.appointmentID}`}
                      aria-haspopup="true"
                      onClick={(event) => setAnchorEl({ ...anchorEl, [row.appointmentID]: event.currentTarget })}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id={`menu-${row.appointmentID}`}
                      anchorEl={anchorEl[row.appointmentID]}
                      open={Boolean(anchorEl[row.appointmentID])}
                      onClose={() => handleCloseMenu(row.appointmentID)}
                    >
                      <MenuItem onClick={() => handleDownload(row)}>
                        <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
                        Download
                      </MenuItem>
                      <MenuItem onClick={() => handlePrint()}>
                        <PrintIcon fontSize="small" sx={{ mr: 1 }} />
                        Print
                      </MenuItem>
                      <MenuItem onClick={() => handleShare(row)}>
                        <ShareIcon fontSize="small" sx={{ mr: 1 }} />
                        Share
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(row)}>
                        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5, color: 'text.secondary' }}>
                  <Typography variant="h6">No upcoming appointments</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={appointmentOpen} onClose={handleCloseAppointmentDialog} maxWidth="md" fullWidth>
        <DialogTitle>Creating New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first-name"
            label="First Name"
            type="text"
            fullWidth
            value={appointmentFormData.firstName}
            onChange={(e) => handleAppointmentInputChange(e, 'firstName')}
          />
          <TextField
            margin="dense"
            id="last-name"
            label="Last Name"
            type="text"
            fullWidth
            value={appointmentFormData.lastName}
            onChange={(e) => handleAppointmentInputChange(e, 'lastName')}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={appointmentFormData.email}
            onChange={(e) => handleAppointmentInputChange(e, 'email')}
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            value={appointmentFormData.address}
            onChange={(e) => handleAppointmentInputChange(e, 'address')}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="queueid-label">Queue</InputLabel>
            <Select
              labelId="queueid-label"
              id="queueId"
              value={appointmentFormData.queueId}
              onChange={(e) => handleAppointmentInputChange(e, 'queueId')}
            >
              {queues.map((queue) => (
                <MenuItem key={queue.queueID} value={queue.queueID}>
                   {queue.queueStartTime} to {queue.queueEndTime}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAppointmentDialog} color="primary" sx={{ border: '1px solid red', color: 'red' }}>Cancel</Button>
          <Button onClick={handleCreateAppointment} color="primary" disabled={loading} sx={{ border: '1px solid', borderColor: 'primary.main', '&:hover': { borderColor: 'primary.dark' } }}>
            {loading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UpcomingAppointments;
