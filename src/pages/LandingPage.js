// material
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
// import {}
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  LandingThemeColor,
  LandingPricingPlans,
  // LandingAdvertisement,
  LandingCleanInterfaces,
  // LandingHugePackElements
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  console.log("Hello  This  IS Landing Page");
  console.log(user)
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
    // else{
    //   // navigate('/auth/login', { replace: true });
    // }
  }, [isAuthenticated, navigate]);

  return (
    <RootStyle title="SmartQ" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingDarkMode />
        <LandingMinimal />
        <LandingThemeColor />
        <LandingCleanInterfaces />
        <LandingPricingPlans />
        
      </ContentStyle>
    </RootStyle>
  );
}
