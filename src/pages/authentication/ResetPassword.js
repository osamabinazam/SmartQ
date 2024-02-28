import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { styled } from '@mui/material/styles'; 
import ResetPasswordForm from './ResetPasswordForm'; 
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import VerifyCode from './VerifyCode'; 

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function ResetPassword() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false); 

  const handleSent = (value) => { 
    setEmail(value); 
    setSent(true);
   
    navigate(PATH_AUTH.verify);
  };

  return (
    <RootStyle title="Reset Password">
      <LogoOnlyLayout />
      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will email you a link to reset your
                password.
              </Typography>
              <ResetPasswordForm onSent={handleSent} onVerified={() => setVerified(true)} />

              <Box sx={{ textAlign: 'center' }}>
                <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 2 }}>
                  Back
                </Button>
              </Box>
            </>
          ) : (
            verified ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>
                <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                  Back
                </Button>
              </Box>
            ) : (
              <VerifyCode email={email} />
            )
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
