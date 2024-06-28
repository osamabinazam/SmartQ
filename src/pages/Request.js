import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import Page from '../components/Page';
import CurrentQueueRequest from '../components/general-app/CurrentQueueRequest';
// import VerticalTableRequest from '../components/general-app/VerticalTableRequest';

export default function Request() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    console.log('Request.js: isAuthenticated:', isAuthenticated);

      if (!isAuthenticated) {
        navigate('/auth/login', { replace: true });
      } else if (user?.usertype !== 'vendor') {
        navigate('/auth/401', { replace: true });
      } else {
        setLoading(false);
      }
    
  }, [isAuthenticated, navigate, user?.usertype]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Page title="Request Page">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          Request
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CurrentQueueRequest sx={{ width: '100%' }} />
          </Grid>
          {/* <Grid item xs={12}>
            <VerticalTableRequest sx={{ maxWidth: '100%', height: '400px' }} />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
