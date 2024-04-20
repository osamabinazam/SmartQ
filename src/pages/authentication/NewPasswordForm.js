import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page'; 
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout'; 

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', 
  padding: theme.spacing(12, 0)
}));

const ContentBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  margin: 'auto', 
}));

const NewPasswordForm = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(true); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(true); 
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError('');
    setConfirmPasswordError('');

 
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setIsSubmitted(true);
  };

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <RootStyle title="New Password">
      <LogoOnlyLayout />
      <Container>
        <ContentBox>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3" paragraph>
              Set New Password
            </Typography>
            <TextField
              type={showPassword ? 'password' : 'text'}
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              fullWidth
              sx={{ marginBottom: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type={showConfirmPassword ? 'password' : 'text'} 
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              fullWidth
              sx={{ marginBottom: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: '20px' }}>
              Submit
            </Button>
          </form>
          {isSubmitted && (
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                Your password has been changed.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </Box>
          )}
        </ContentBox>
      </Container>
    </RootStyle>
  );
};

export default NewPasswordForm;
