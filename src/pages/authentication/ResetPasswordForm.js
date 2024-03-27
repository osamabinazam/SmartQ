import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const ResetPasswordForm = ({ onSent, onVerified }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = /@gmail\.com$/.test(email);
    if (!isValidEmail) {
      setEmailError('Please enter a valid email address ending with @gmail.com');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      onSent(email);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError('');
        }}
        style={{ padding: '10px', fontSize: '16px', width: '100%' }}
      />
      {emailError && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {emailError}
        </Typography>
      )}
      <Box sx={{ textAlign: 'center' }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Reset Password'}
        </Button>
      </Box>
    </form>
  );
};

export default ResetPasswordForm;
