import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { PageNotFoundIllustration } from '../assets';
import useAuth from 'src/hooks/useAuth';
import {  useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import checkRole from 'src/utils/checkUserRole';
import MainNavbar from '../layouts/main/MainNavbar';   

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));



// ----------------------------------------------------------------------

export default function Page401() {

    const { logout, isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    console.log(user)


    // logout user 
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/auth/login');
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <RootStyle title="401 Unauthorized Access " id="401">
      <Container>
      <MainNavbar />
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
               No Permission
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry,  You do not have permission to view this page. Please use the SmartQ mobile app for customers or contact support if you believe this is an error.
            </Typography>

            <motion.div variants={varBounceIn}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </motion.div>

            {isAuthenticated && user && (
              <Typography variant='h5' sx={{ mb: 2, color: 'text.secondary', alignSelf: 'flex-start' }}>
                Logged in as: {user.username} ({user.usertype})
              </Typography>
            )}

            <Button to="/" size="large" variant="contained" component={RouterLink} sx={{ mr: 2 }} >
              Return Home
            </Button>

            <Button to="/" size="large" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
