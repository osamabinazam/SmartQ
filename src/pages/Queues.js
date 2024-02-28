// material
import { Container, Typography, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { AppTotalActiveUsers, AppTotalInstalled, AppTotalDownloads } from '../components/general-app';
import UpcomingAppointments from '../components/general-app/UpcomingAppointments';

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Page Three | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Manage Queue
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalInstalled />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid>

          <Grid item xs={12}>
            <UpcomingAppointments />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
