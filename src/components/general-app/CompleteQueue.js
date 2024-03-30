import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

const CompleteQueueMockData = [
  {
    id: '1',
    name: 'John Doe',
    start: '09:00 AM',
    end: '10:00 AM',
    status: 'Completed',
    avatar: '/static/mock-images/avatars/avatar_1.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    start: '10:00 AM',
    end: '11:00 AM',
    status: 'Completed',
    avatar: '/static/mock-images/avatars/avatar_2.jpg'
  },
  {
    id: '3',
    name: 'Jane Smith',
    start: '10:00 AM',
    end: '11:00 AM',
    status: 'Completed',
    avatar: '/static/mock-images/avatars/avatar_3.jpg'
  },
];

export default function CompleteQueue() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);

  const handleClickMenu = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setEditedRowData(rowData);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const rowDataText = `Name: ${editedRowData.name}\nStart: ${editedRowData.start}\nEnd: ${editedRowData.end}\nStatus: ${editedRowData.status}`;
    const element = document.createElement('a');
    const file = new Blob([rowDataText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'rowData.txt';
    document.body.appendChild(element);
    element.click();
    handleCloseMenu();
  };

  const handlePrint = () => {
    window.print();
    handleCloseMenu();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shared Data',
          text: `Name: ${editedRowData.name}, Start: ${editedRowData.start}, End: ${editedRowData.end}, Status: ${editedRowData.status}`,
        });
        console.log('Data shared successfully');
      } catch (error) {
        console.error('Error sharing data:', error);
      }
    } else {
      console.log('Web Share API not supported');
    }
    handleCloseMenu();
  };

  const handleDelete = () => {
    const newData = CompleteQueueMockData.filter(item => item.id !== editedRowData.id);
    // Update state with newData
    console.log('Data deleted:', editedRowData);
    handleCloseMenu();
  };

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6" component="div">
              Complete Queue
            </Typography>
          }
          sx={{ mb: 3 }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CompleteQueueMockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Avatar src={row.avatar} />
                    {row.name}
                  </TableCell>
                  <TableCell>{row.start}</TableCell>
                  <TableCell>{row.end}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleClickMenu(event, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
