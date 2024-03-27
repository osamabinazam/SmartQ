import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import downloadFill from '@iconify/icons-eva/download-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import printerFill from '@iconify/icons-eva/printer-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Divider,
  CardHeader,
  Menu,
  MenuItem
} from '@mui/material';
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';
import PropTypes from 'prop-types';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import MAvatar from '../@material-extend/MAvatar'; // Import MAvatar component

const CurrentQueueRequestMockData = [
  {
    id: '1',
    name: 'Simran Waswani',
    service: 'Urologist',
    time: '09:00 AM',
    status: 'Completed',
    avatar: '/static/mock-images/avatars/avatar_1.jpg' // Add avatar URL
  },
  {
    id: '2',
    name: 'Shafique Ahmed',
    service: 'Gynecologist',
    time: '10:00 AM',
    status: 'Pending',
    avatar: '/static/mock-images/avatars/avatar_2.jpg' // Add avatar URL
  }
];

function MoreMenuButton({ onClick }) {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

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
          <Icon icon={downloadFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Download
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Icon icon={shareFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Share
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClick}>
          <Icon icon={printerFill} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Print
          </Typography>
        </MenuItem>
        <MenuItem onClick={onClick} sx={{ color: 'error.main' }}>
          <Icon icon={trash2Outline} width={20} height={20} />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default function CurrentQueueRequest() {
  const handleClickOption = () => {};

  return (
    <>
      <Card>
        <CardHeader title="Request for Current Queue" sx={{ mb: 3 }} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CurrentQueueRequestMockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MAvatar src={row.avatar} alt={row.name} />
                        <Typography variant="subtitle2" sx={{ marginLeft: '12px', color: 'text.primary' }}>
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.time}</TableCell>
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
