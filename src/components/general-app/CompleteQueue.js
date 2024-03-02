import React from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Button, Divider, CardHeader, Menu, MenuItem, Avatar } from '@mui/material';
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';
import bookFill from '@iconify/icons-eva/book-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import PropTypes from 'prop-types';


const CompleteQueueMockData = [
  {
    id: '1',
    name: 'John Doe',
    start: '09:00 AM',
    end: '10:00 AM',
    status: 'Completed',
    
  },
  {
    id: '2',
    name: 'Jane Smith',
    start: '10:00 AM',
    end: '11:00 AM',
    status: 'Completed',
  
  },
  {
     id: '3',
    name: 'Jane Smith',
    start: '10:00 AM',
    end: '11:00 AM',
    status: 'Completed',
   
  },
];

function AvatarIcon({ icon }) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral'
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Avatar>
  );
}

function MoreMenuButton({ onClick }) {
  const menuRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton ref={menuRef} size="large" onClick={handleOpen}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </MIconButton>

      <Menu
        open={open}
        anchorEl={menuRef.current}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={onClick}>
          <Typography variant="body2">Option 1</Typography>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Typography variant="body2">Option 2</Typography>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Typography variant="body2">Option 3</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function CompleteQueue() {
  const handleClickOption = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Complete Queue" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CompleteQueueMockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.start}</TableCell>
                    <TableCell>{row.end}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="right">
                      <MoreMenuButton onClick={handleClickOption} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Icon icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </Card>
    </>
  );
}
