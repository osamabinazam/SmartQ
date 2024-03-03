import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import CurrentQueueRequest from '../components/general-app/CurrentQueueRequest'; 
import VerticalTableRequest from '../components/general-app/VerticalTableRequest'; 

export default function Request() {
  return (
    <Page title="Request Page">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
         Request 
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CurrentQueueRequest />
          </Grid>
          <Grid item xs={12} md={4}>
            <VerticalTableRequest />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
