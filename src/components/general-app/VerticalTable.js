import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import SuspendIcon from '@mui/icons-material/Pause';

const VerticalTableData = [
  {
    id: '1',
    queueId: 18765,
    startTime: '09:00 AM',
    endTime: '10:00 AM',
  },
  {
    id: '2',
    queueId: 18766,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
  },
  {
    id: '3',
    queueId: 18767,
    startTime: '11:00 AM',
    endTime: '12:00 PM',
  },
];

const VerticalTable = () => {
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);
  const [anchorEl, setAnchorEl] = useState({});
  const [verticalTableData, setVerticalTableData] = useState(VerticalTableData);

  const handleEditRow = (rowData) => {
    setEditableRowId(rowData.id);
    setEditedRowData({ ...rowData });
    handleCloseMenu(rowData.id);
  };

  const handleSaveRow = () => {
    setEditableRowId(null);
    console.log('Saving edited row:', editedRowData);
    const updatedData = verticalTableData.map((row) => {
      if (row.id === editedRowData.id) {
        return editedRowData;
      }
      return row;
    });
    setVerticalTableData(updatedData);
  };

  const handleCancelEdit = () => {
    setEditableRowId(null);
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

  const handleDelete = (rowData) => {
    console.log('Deleting:', rowData.queueId);
    handleCloseMenu(rowData.id);
  };

  const handlePrint = () => {
    console.log('Printing:', editedRowData.queueId);
    handleCloseMenu(editedRowData.id);
  };

  const handleSuspend = (rowData) => {
    console.log('Suspending:', rowData.queueId);
    handleCloseMenu(rowData.id);
  };

  const handleInputChange = (e, field) => {
    setEditedRowData({
      ...editedRowData,
      [field]: e.target.value,
    });
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '16px', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6">Upcoming Queue</Typography>
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', position: 'relative'}}>
        <Table sx={{ border: 'none' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: 'none' }}>Queue ID</TableCell>
              <TableCell style={{ border: 'none' }}>Start Time</TableCell>
              <TableCell style={{ border: 'none' }}>End Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verticalTableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.id === editableRowId ? (
                    <TextField size="small" value={editedRowData.queueId} onChange={(e) => handleInputChange(e, 'queueId')} />
                  ) : (
                    row.queueId
                  )}
                </TableCell>
                <TableCell>
                  {row.id === editableRowId ? (
                    <TextField size="small" value={editedRowData.startTime} onChange={(e) => handleInputChange(e, 'startTime')} />
                  ) : (
                    row.startTime
                  )}
                </TableCell>
                <TableCell>
                  {row.id === editableRowId ? (
                    <TextField size="small" value={editedRowData.endTime} onChange={(e) => handleInputChange(e, 'endTime')} />
                  ) : (
                    row.endTime
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton aria-label="more" onClick={(event) => handleClickMenu(event, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editableRowId && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSaveRow}>
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </Box>
      )}
      <Menu
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl[editedRowData?.id])}
        onClose={() => handleCloseMenu(editedRowData?.id)}
        anchorEl={anchorEl[editedRowData?.id]}
      >
        <MenuItem onClick={() => handleEditRow(editedRowData)}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handlePrint(editedRowData)}>
          <PrintIcon sx={{ mr: 1 }} />
          Print
        </MenuItem>
        <MenuItem onClick={() => handleDelete(editedRowData)}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => handleSuspend(editedRowData)}>
          <SuspendIcon sx={{ mr: 1 }} />
          Suspend
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default VerticalTable;
