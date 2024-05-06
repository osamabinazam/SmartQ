import React from 'react';
import { Container, Typography, Grid, Card, Box, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { varFadeInUp, MotionInView, varFadeInDown } from '../../animate';

const CARDS = [
  {
    title: 'Real-time Scheduling',
    description:
      'Instantly book appointments with dynamic, live updates ensuring you are always in sync with available slots, eliminating waiting times and streamlining your scheduling experience.'
  },
  {
    title: 'Seamless Integration',
    description:
      'Experience effortless coordination with various public services as our platform seamlessly integrates, providing you with a unified interface to access and manage appointments across diverse sectors, enhancing efficiency and convenience.'
  },
  {
    title: 'User-Centric Design',
    description:
      'Our platform boasts an intuitively crafted interface, prioritizing user experience with easy-to-navigate features, ensuring smooth and hassle-free interactions, ultimately empowering users with intuitive controls and seamless navigation for optimal productivity.'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15)
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
  maxWidth: 380,
  minHeight: 440,
  margin: 'auto',
  textAlign: 'center',
  padding: theme.spacing(10, 5, 0),
  boxShadow: `-40px 40px 80px 0 ${theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black}`,
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  '&.cardLeft': {
    [theme.breakpoints.up('md')]: { marginTop: -40 }
  },
  '&.cardCenter': {
    [theme.breakpoints.up('md')]: {
      marginTop: -80,
      backgroundColor: theme.palette.background.paper,
      boxShadow: `-40px 40px 80px 0 ${theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black}`,
      '&:before': {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        content: "''",
        margin: 'auto',
        position: 'absolute',
        width: 'calc(100% - 40px)',
        height: 'calc(100% - 40px)',
        borderRadius: theme.shape.borderRadiusMd,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-20px 20px 40px 0 ${theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black}`
      }
    }
  }
}));

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <RootStyle>
      <Container maxWidth="xl"> {/* Changed to xl */}
        <Box sx={{ mb: { xs: 10, md: 25 } }}>
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
              SmartQ
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Typography variant="h2" sx={{ textAlign: 'center', fontSize: 36 }}> {/* Increased font size */}
              What SmartQ helps you?
            </Typography>
          </MotionInView>
        </Box>

        <Grid container spacing={isDesktop ? 10 : 5}>
          {CARDS.map((card, index) => (
            <Grid key={card.title} item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter')}>
                  <Typography variant="h4" paragraph sx={{ mb: 2 }}> {/* Increased font size */}
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                    {card.description}
                  </Typography>
                </CardStyle>
              </MotionInView>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
