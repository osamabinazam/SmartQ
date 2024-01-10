
// Libraries
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
import { Box, Link, Container, Typography } from '@mui/material';     // Matrial UI components
import Logo from '../../components/Logo';                             // Logo 
import MainNavbar from './MainNavbar';                                // Landing page navbar
import MainFooter from './MainFooter';                                // Landing page footer           




const MainLayout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              ©2024 All rights reserved
              <br /> made by SmartQ team&nbsp;
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}

export default MainLayout;
