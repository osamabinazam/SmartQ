import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, 
  // List,
  // ListItemButton, 
  // ListItemIcon,
  // ListItemText 
} from '@mui/material';
import Lists from './Lists';
// import DraftsIcon from '@mui/icons-material/Drafts';
import { 
  MotionInView, 
  varFadeInUp,
  // varFadeInDown 
} from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(28, 0),
  backgroundColor: theme.palette.grey[900]
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// const ListWrapperStyle = styled('div')(({ theme }) => ({
//   width: '100%',
//   border: `solid 1px ${theme.palette.divider}`,
//   backgroundColor: theme.palette.background.paper,
// }));

export default function LandingWhySmartQ() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Box
          component="img"
          alt="image shape"
          src="/static/home/shape.svg"
          sx={{
            top: 0,
            right: 0,
            bottom: 0,
            my: 'auto',
            position: 'absolute',
            filter: 'grayscale(1) opacity(48%)',
            display: { xs: 'none', md: 'block' }
          }}
        />

        <Grid container spacing={5} direction="row-reverse" justifyContent="space-between">
          <Grid item xs={12} >

            <ContentStyle>
              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'White' }}>
                  Why choose SmartQ?
                </Typography>
              </MotionInView>



              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: 'common.Black', mb: 5 }}>
                  <Lists sx={{ width: '100%', maxWidth: 360, margin: 'auto' }} />
                 
                </Typography>
              </MotionInView>
            </ContentStyle>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
