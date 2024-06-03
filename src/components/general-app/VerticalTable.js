import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from 'src/utils/axios';
import Scrollbar from '../Scrollbar';

export default function InactiveQueue() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);
  const [inactiveQueue, setInactiveQueue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/queue/status?queueStatus=inactive');
        console.log("response.data", response.data);
        setInactiveQueue(response.data);
      } catch (error) {
        console.error('Failed to fetch inactive queue:', error);
      }
    };
    fetchData();
  }, []);

  const handleClickMenu = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setEditedRowData(rowData);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const rowDataText = `ID: ${editedRowData.queueID}\nStart: ${editedRowData.queueStartTime}\nEnd: ${editedRowData.queueEndTime}\nStatus: ${editedRowData.queueStatus}`;
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
          text: `ID: ${editedRowData.queueID}, Start: ${editedRowData.queueStartTime}, End: ${editedRowData.queueEndTime}, Status: ${editedRowData.queueStatus}`,
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
    const newData = inactiveQueue.filter(item => item.queueID !== editedRowData.queueID);
    setInactiveQueue(newData);
    console.log('Data deleted:', editedRowData);
    handleCloseMenu();
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Inactive Queue
          </Typography>
        }
        sx={{ mb: 3 }}
      />
      <Scrollbar style={{ maxHeight: '400px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inactiveQueue.length !== 0 ? (
                inactiveQueue.map((row) => (
                  <TableRow key={row.queueID}>
                    <TableCell>{row.queueID}</TableCell>
                    <TableCell>{format(new Date(row.queueStartTime), 'yyyy-MM-dd HH:mm')}</TableCell>
                    <TableCell>{format(new Date(row.queueEndTime), 'yyyy-MM-dd HH:mm')}</TableCell>
                    <TableCell>{row.queueStatus}</TableCell>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
