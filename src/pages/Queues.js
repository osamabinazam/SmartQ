import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import Page from '../components/Page';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';
import VerticalTable from '../components/general-app/VerticalTable';
import CompleteQueue from '../components/general-app/CompleteQueue';

export default function PageThree() {
  return (
    <Page title="Page Three ">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          Queue
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <UpcomingAppointments />
          </Grid>
          <Grid item xs={12} md={4}>
            <VerticalTable />
          </Grid>
          <Grid item xs={12}>
            <CompleteQueue />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
