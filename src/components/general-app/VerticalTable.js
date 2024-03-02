import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Box, Button, Icon, Divider } from '@mui/material';
import MoreMenuButton from './MoreMenuButton'; // Import the MoreMenuButton component
import Scrollbar from '../Scrollbar'; // Import the custom Scrollbar component
import { Link as RouterLink } from 'react-router-dom'; // Import Link from react-router-dom

// Mock data for the vertical table
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

  // Add more data as needed
];

const VerticalTable = () => {
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
                  {/* Use the MoreMenuButton component here */}
                  <TableCell align="right">
                    <MoreMenuButton
                      onDownload={() => {}}
                      onPrint={() => {}}
                      onShare={() => {}}
                      onDelete={() => {}}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {/* Divider to create a line above the "View All" button */}
              <TableRow>
                <TableCell colSpan={2}>
                  <Divider sx={{ width: '100%' }} />
                </TableCell>
              </TableRow>
              {/* Additional row for the "View All" button */}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <Button
                    to="#"
                    size="small"
                    color="inherit"
                    component={RouterLink}
                    endIcon={<Icon icon={'eva:arrow-ios-forward-fill'} />}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }} // Add styles to match the design
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
