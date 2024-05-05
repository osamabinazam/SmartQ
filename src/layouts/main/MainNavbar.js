import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Stack, Box, Typography,Button, AppBar, Toolbar, Container } from '@mui/material';
import useOffSetTop from '../../hooks/useOffSetTop';
import Logo from '../../components/Logo';
import { MHidden } from '../../components/@material-extend';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import useAuth from 'src/hooks/useAuth';
import AccountPopover from '../dashboard/AccountPopover';
import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import { PATH_DASHBOARD } from '../../routes/paths'; // Ensure this path is defined

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

const MainNavbar = () => {
  const isOffset = useOffSetTop(100);
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const navigate = useNavigate();

  // Dynamically modify the navConfig based on authentication status
  const dynamicNavConfig = isAuthenticated ? [
    ...navConfig,
    {
      title: 'Dashboard',
      path: PATH_DASHBOARD.root,  // Adjust the dashboard path as needed
      icon: <Icon icon={fileFill} width={22} height={22} />
    }
  ] : navConfig;

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters sx={{ ...(isOffset && { bgcolor: 'background.default', height: { md: APP_BAR_DESKTOP - 16 } }) }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6" sx={{ flexGrow: 0 }}>
                Hello, {user?.username || 'User'}
              </Typography>
              <AccountPopover />
            </Stack>
          ) : (
            <>
              <MHidden width="mdDown">
                <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={dynamicNavConfig} />
              </MHidden>
              <MHidden width="mdUp">
                <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={dynamicNavConfig} />
              </MHidden>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
                <Button variant="contained" onClick={handleRegister}>
                  Register
                </Button>
              </Box>
            </>
          )}
        </Container>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
};

export default MainNavbar;
