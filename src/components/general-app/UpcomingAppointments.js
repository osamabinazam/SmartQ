import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, IconButton, Menu, MenuItem, Avatar, Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../utils/axios';

const UpcomingAppointments = ({ isActive, queueid }) => {
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [anchorEl, setAnchorEl] = useState({});

  useEffect(() => {
    if (!isActive) {
      setCurrentAppointments([]);
      return;
    }
    

    const fetchUpcomingAppointments = async () => {
      try {
        console.log("Queue ID: ", queueid)
        const response = await axiosInstance.post('/api/appointment/upcoming', { queueId:queueid });

        console.log("Response: ", response.data);
        setCurrentAppointments(response.data.length > 0 ? response.data : null);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
        setCurrentAppointments(null);
      }
    };

    fetchUpcomingAppointments();
  
  }, [isActive, queueid]);

  
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
      <CardHeader
        title={<Typography variant="h6">Current Appointments</Typography>}
        sx={{ mb: 3 }}
      />
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
                    <Avatar src={row.customer_profile.avatar || '/static/mock-images/avatars/avatar_default.jpg'} />
                    {`${row.customer_profile.firstname} ${row.customer_profile.lastname}`}
                  </TableCell>
                  <TableCell>{format(new Date(row.appointmentDateTime), 'dd MMM yyyy p')}</TableCell>
                  <TableCell>{row.service.name}</TableCell>
                  <TableCell>{row.service.price}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls={`menu-${row.appointmentID}`}
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
    </Card>
  );
};

export default UpcomingAppointments;
