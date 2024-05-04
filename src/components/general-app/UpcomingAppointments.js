import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Menu, MenuItem, Avatar, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axios';

import Label from '../Label';
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';

const UpcomingAppointmentMockData = [
  {
    id: '1',
    name: 'Simran Waswani',
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    type: 'Urologist',
    message: 'Additional note and message from customer.',
    category: 'Medical',
    date: 1627556358365,
  },
  {
    id: '2',
    name: 'Shafique Ahmed',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    type: 'Gynecologist',
    message: 'Additional note and message from customer.',
    category: 'Medical',
    date: 1627556329038,
  },
  {
    id: '3',
    name: 'Osama Bin Azam',
    avatar: '/static/mock-images/avatars/avatar_3.jpg',
    type: 'National Identity Card',
    message: 'Additional note and message from customer.',
    category: 'Nadra',
    date: 1627556339677,
  },
  {
    id: '4',
    name: 'Sadia Khan',
    avatar: null,
    type: 'Birth Certificate',
    message: 'Additional note and message from customer.',
    category: 'Nadra',
    date: 1627547330510,
  },
];

export default function UpcomingAppointments({ isActive, queueid }) {

  console.log("Is Active: ", isActive)

  const [editableRows, setEditableRows] = useState(UpcomingAppointmentMockData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRowData, setEditedRowData] = useState(null);
  const [anchorEl, setAnchorEl] = useState({});

  const handleEditRow = (rowData) => {
    setIsEditing(true);
    setEditedRowData({ ...rowData });
    handleCloseMenu(rowData.id);
  };

  const handleSaveRow = () => {
    setIsEditing(false);
    console.log('Saving edited row:', editedRowData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedRowData(null);
    console.log('Canceling edit');
  };

  const handleClickMenu = (event, rowData) => {
    setAnchorEl({ ...anchorEl, [rowData.id]: event.currentTarget });
    setEditedRowData(rowData);
  };

  const handleCloseMenu = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };

  const handleDownload = () => {
    const { name, date, type, category } = editedRowData;
    const formattedDate = format(new Date(date), 'dd MMM yyyy p');
    const dataToDownload = `Name: ${name}\nTime: ${formattedDate}\nService Type: ${type}\nCategory: ${category}`;
    const blob = new Blob([dataToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appointment_details.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    handleCloseMenu(editedRowData.id);
  };

  const handlePrint = () => {
    window.print();
    handleCloseMenu(editedRowData.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      const { name, type, message } = editedRowData;
      navigator.share({
        title: 'Appointment Details',
        text: `Name: ${name}, Type: ${type}, Message: ${message}`,
      }).then(() => {
        console.log('Data shared successfully');
      }).catch((error) => {
        console.error('Error sharing data:', error);
      });
    } else {
      console.log('Web Share API not supported');
    }
    handleCloseMenu(editedRowData.id);
  };

  const handleDelete = () => {
    const updatedRows = editableRows.filter(row => row.id !== editedRowData.id);
    setEditableRows(updatedRows);
    setIsEditing(false);
    handleCloseMenu(editedRowData.id);
  };

  /**
   * Get Data from API
   */

  const [UpcomingAppointments, setUpcomingAppointments] = useState([]);

  
  useEffect(() => {

    if (!isActive) {
      setEditableRows([]);
    }

    fetchUpcomingAppointments();


  }
  , [isActive]);

  const fetchUpcomingAppointments = async () => {

    console.log("Queue ID: ", queueid);
    const data ={
      queueid: queueid
    }

    try {
      const response = await axiosInstance.post('/api/appointment/upcoming', data);
      console.log(response.data);
      setUpcomingAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Upcomming Appointments
          </Typography>
        }
        action={
          <>
            {isEditing ? (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveRow}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                disabled={isEditing}
              >
                Edit
              </Button>
            )}
          </>
        }
        sx={{ mb: 3 }}
      />
      {
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editableRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Avatar src={row.avatar} />
                    {row.name}
                  </TableCell>
                  <TableCell>
                    {format(new Date(row.date), 'dd MMM yyyy p')}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">
                    {!isEditing ? (
                      <>
                        <IconButton
                          aria-label="more"
                          aria-controls={`menu-${row.id}`}
                          aria-haspopup="true"
                          onClick={(event) => handleClickMenu(event, row)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id={`menu-${row.id}`}
                          anchorEl={anchorEl[row.id]}
                          open={Boolean(anchorEl[row.id])}
                          onClose={() => handleCloseMenu(row.id)}
                        >
                          <MenuItem onClick={handleDownload}>
                            <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
                            Download
                          </MenuItem>
                          <MenuItem onClick={handlePrint}>
                            <PrintIcon fontSize="small" sx={{ mr: 1 }} />
                            Print
                          </MenuItem>
                          <MenuItem onClick={handleShare}>
                            <ShareIcon fontSize="small" sx={{ mr: 1 }} />
                            Share
                          </MenuItem>
                          <MenuItem onClick={handleDelete}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                            Delete
                          </MenuItem>
                        </Menu>
                      </>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Card>
  );
}
