import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import CurrentQueueRequest from '../components/general-app/CurrentQueueRequest'; 
import VerticalTableRequest from '../components/general-app/VerticalTableRequest'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

export default function Request() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  console.log("user us : ",user)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    if (isAuthenticated && user?.usertype !== 'vendor') {
      navigate('/auth/401', { replace: true });
    }

  }, [isAuthenticated, navigate, user.usertype]);
 
  
  return (
    <Page title="Request Page">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
         Request 
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={7}>
            <CurrentQueueRequest sx={{ width: '100%' }} /> 
          </Grid>
          <Grid item xs={12} md={5}>
            <VerticalTableRequest sx={{ maxwidth: '100%', height: '400px' }} /> 
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
