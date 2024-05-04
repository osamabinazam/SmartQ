// material
import {
  Container,
  Grid,
} from '@mui/material';
// hooks
import useAuth from '../hooks/useAuth';
import useSettings from '../hooks/useSettings';
import { useEffect, useState } from 'react';
// components
import Page from '../components/Page';
import {
  AppWelcome,
  AppNewInvoice,
  TotalAppointments,
  RemainingAppointments,
  AverageWaitTime,
  LastUpdate,
} from '../components/general-app';
import UpcomingAppointments from 'src/components/general-app/UpcomingAppointments';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------


export default function GeneralApp() {

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { themeStretch } = useSettings();


  // States to hold data
  const [queueData, setQueueData] = useState([]);
  const [updateTime, setUpdateTime] = useState();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    fetchQueueData();

  }, [isAuthenticated, navigate]);

  const fetchQueueData = async () => {
    try {
      const startTime = new Date(); // Store the current time before making the API call
      const response = await axiosInstance.get('/api/queue');
      const endTime = new Date(); // Store the current time after receiving the response
      console.log(response.data);
      setQueueData(response.data);
  
      // Calculate the time elapsed
      const timeElapsed = endTime - startTime; // Time elapsed in milliseconds
      const minutesElapsed = Math.floor(timeElapsed / (1000 * 60)); // Convert milliseconds to minutes
  
      // Display time elapsed
      setUpdateTime(minutesElapsed);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={3}>



        <AppWelcome displayName={user?.username} />


        {queueData.queueStatus ? (
          <>
            <Typography xs={12} md={6} variant="h3" component="div" sx={{ color: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between', paddingTop: '20px' }}>
              Active Queue
              <Typography xs={12} md={6} component="div" sx={{ color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '20px' }}>
                {queueData?.services?.name} -  
              </Typography>
            </Typography>
          </>
        ) : (
          <>  
            <Typography xs={12} md={6} variant="h3" component="div" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between', paddingTop: '20px' }}>
              No Active Queue
            </Typography>
          </>
          
        )}


        <Grid container spacing={3}>
          {queueData.queueStatus ? (
            <>
              <Grid item xs={12} md={3}>
                <TotalAppointments  data ={queueData.currentQueueSize}/>
              </Grid>
              <Grid item xs={12} md={3}>
                <RemainingAppointments data ={queueData.remaing} />
              </Grid>
              <Grid item xs={12} md={3}>
                <AverageWaitTime data ={queueData.averageServiceTime} />
              </Grid>
              <Grid item xs={12} md={3}>
                <LastUpdate data={updateTime} />
              </Grid>
              <Grid item xs={12}>
                <UpcomingAppointments isActive={true} queueid = {queueData?.queueID} />
              </Grid>
              <Grid item xs={12}>
                <AppNewInvoice />
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" textAlign="center">
                No Active Data Available
              </Typography>
            </Grid>
          )}
        </Grid>



      </Container>
    </Page>
  );
}
