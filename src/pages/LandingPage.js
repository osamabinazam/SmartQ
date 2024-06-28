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
  // LandingDarkMode,
  // LandingPricingPlans,
  // LandingAdvertisement,
  LandingCleanInterfaces,

  LandingHugePackElements,
} from '../components/_external-pages/landing';
import LandingWhySmartQ from 'src/components/_external-pages/landing/LandingWhySmartQ';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(0)
}));

// ----------------------------------------------------------------------

export default function LandingPage() {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
    else{
      // navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <RootStyle title="SmartQ" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingWhySmartQ />
        <LandingHugePackElements />
        <LandingMinimal />
     
        <LandingCleanInterfaces />
        {/* <LandingPricingPlans /> */}
        
      </ContentStyle>
    </RootStyle>
  );
}
