import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function NotActiveQueue({ queueData }) {


  return (
    <RootStyle title="Queues">
      <Container>
        <MotionContainer initial="initial" open>
          <Box >
            <motion.div variants={varBounceIn}>
              {queueData.queueStatus ? (
                <>
                  <Typography xs={12} md={6} variant="h3" component="div" sx={{ color: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between', paddingTop: '20px' }}>
                    Active Queue
                    <Typography xs={12} md={6} component="div" sx={{ color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'left', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '20px' }}>
                      {queueData?.services?.name} - {queueData?.queueStartTime} to {queueData?.queueEndTime}
                    </Typography>
                  </Typography>
                </>
              ) : (
                <Box sx={
                  {
                    maxWidth: 480,
                    margin: 'auto',
                    textAlign: 'center',
                    mb: 5,
                  }}>
                  <motion.div variants={varBounceIn}>
                    <Typography xs={12} md={6} variant="h2" component="div" sx={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between', paddingTop: '20px' }}>
                      No Active Queue
                    </Typography>

                    <Typography xs={12} md={6} variant="h4" component="div" sx={{ color: 'text.secondary', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between', paddingTop: '20px' }}>
                      It looks quiet here. Tap below to add your first queue.
                    </Typography>

                  </motion.div>
                </Box>

              )}
            </motion.div>

          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
