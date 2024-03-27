import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Box, Button, Icon, Divider } from '@mui/material';
import MoreMenuButton from './MoreMenuButton';
import Scrollbar from '../Scrollbar'; 
import { Link as RouterLink } from 'react-router-dom'; 

const VerticalTableData = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/static/mock-images/avatars/avatar_1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    
  },
  {
    id: '3',
    name: 'Jane',
    avatar: '/static/mock-images/avatars/avatar_3.jpg',
  },
  {
    id: '4',
    name: 'Smith',
    avatar: '/static/mock-images/avatars/avatar_4.jpg',
  },
 
];

const VerticalTable = () => {
  const handleDownload = (rowData) => {
    console.log('Downloading:', rowData.name);
  };

  const handlePrint = (rowData) => {
    console.log('Printing:', rowData.name);
  };

  const handleShare = (rowData) => {
    console.log('Sharing:', rowData.name);
  };
  const handleDelete = (rowData) => {
    console.log('Deleting:', rowData.name);
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', padding: '16px', borderRadius: '8px', position: 'relative' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px' }}>Upcoming Queue</Typography>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto', position: 'relative' }}>
        <Scrollbar sx={{ paddingRight: '8px', '&::-webkit-scrollbar': { backgroundColor: 'transparent' } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {VerticalTableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <MoreMenuButton
                      onDownload={() => handleDownload(row)}
                      onPrint={() => handlePrint(row)}
                      onShare={() => handleShare(row)}
                      onDelete={() => handleDelete(row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>
                  <Divider sx={{ width: '100%' }} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={'eva:arrow-ios-forward-fill'} />}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }} 
                  >
                    View All  &gt;
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Box>
  );
};

export default VerticalTable;
