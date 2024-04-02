// material
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import CompleteQueue from '../components/general-app/CompleteQueue'; // Import CompleteQueue component
// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettings();

  return (
    <Page title="History | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          History
        </Typography>
        
        <CompleteQueue />
      </Container>
    </Page>
  );
}
