import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Box } from '@mui/material';
import { format } from 'date-fns';

const CurrentRunningAppointment = ({ appointments, setAppointments }) => {
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer;
    if (currentAppointment) {
      timer = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000); // 1 second interval
    }
    return () => clearInterval(timer);
  }, [currentAppointment]);

  const handleStartAppointment = () => {
    const appointment = appointments[0];
    setCurrentAppointment(appointment);
    setAppointments(prevAppointments => prevAppointments.slice(1));
    setTimeElapsed(0);
  };

  const handleCompleteAppointment = () => {
    setCurrentAppointment(null);
    setTimeElapsed(0);
  };

  const handleResetAppointment = () => {
    setTimeElapsed(0);
  };

  return (
    <Card>
      <CardHeader title="Current Running Appointment" />
      <CardContent>
        {currentAppointment ? (
          <Box>
            <Typography variant="h6">{`${currentAppointment.customer_profile?.firstname} ${currentAppointment.customer_profile?.lastname}`}</Typography>
            <Typography>{`Time: ${format(new Date(currentAppointment.appointmentDateTime), 'dd MMM yyyy p')}`}</Typography>
            <Typography>{`Service Type: ${currentAppointment.service?.name}`}</Typography>
            <Typography>{`Price: ${currentAppointment.service?.price}`}</Typography>
            <Typography>{`Time Elapsed: ${Math.floor(timeElapsed / 60)} minutes ${timeElapsed % 60} seconds`}</Typography>
            <Button variant="contained" color="primary" onClick={handleCompleteAppointment} sx={{ mt: 2 }}>
              Complete
            </Button>
            <Button variant="contained" color="secondary" onClick={handleResetAppointment} sx={{ mt: 2, ml: 2 }}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography>No current running appointment</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartAppointment}
              disabled={appointments.length === 0}
              sx={{ mt: 2 }}
            >
              Start Appointment
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentRunningAppointment;
