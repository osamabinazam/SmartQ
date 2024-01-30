// material
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  LandingThemeColor,
  LandingPricingPlans,
  LandingAdvertisement,
  LandingCleanInterfaces,
  LandingHugePackElements
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
