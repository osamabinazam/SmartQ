// MoreMenuButton.js

import React from 'react';
import { Button, Menu, MenuItem, Typography, Icon } from '@mui/material'; // Import Icon component
import { Check as CheckIcon, Close as CloseIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';

const MoreMenuButton = ({ onAccept, onDecline }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccept = () => {
    onAccept && onAccept(); // Call the onAccept function passed as a prop if it exists
    handleClose(); // Close the menu
  };

  const handleDecline = () => {
    onDecline && onDecline(); // Call the onDecline function passed as a prop if it exists
    handleClose(); // Close the menu
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="text" endIcon={<MoreVertIcon />}>
        {/* Three dots icon */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAccept}>
          <CheckIcon />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Accept
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDecline}>
          <CloseIcon />
          <Typography variant="body2" sx={{ ml: 2 }}>
            Decline
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreMenuButton;
