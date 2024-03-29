// material
import { 
  Container, 
  Grid, 
  // Stack 
} from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
// import { useEffect } from 'react';
// components
import Page from '../components/Page';
import {
  AppWelcome,
  // AppWidgets1,
  // AppWidgets2,
  // AppFeatured,
  AppNewInvoice,
  // AppTopAuthors,
  // AppTopRelated,
  // AppAreaInstalled,
  AppTotalDownloads,
  AppTotalInstalled,
  // AppCurrentDownload,
  AppTotalActiveUsers,
  // AppTopInstalledCountries
} from '../components/general-app';
import UpcomingAppointments from 'src/components/general-app/UpcomingAppointments';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------


export default function GeneralApp() {

  const { isAuthenticated, user } = useAuth();
  

  

  console.log(user)
  const navigate = useNavigate();
  console.log(isAuthenticated);

  if  (!isAuthenticated) {
    
    // navigate('/auth/login', { replace: true });
  }

  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}   >
            <AppWelcome displayName={user.username}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalActiveUsers />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTotalInstalled />
          </Grid> 

          <Grid item xs={12} md={4}>
            <AppTotalDownloads />
          </Grid> 
          
          <Grid item xs={12} >
            <UpcomingAppointments />
          </Grid>

          

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid> */}

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidgets1 />
              <AppWidgets2 />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
