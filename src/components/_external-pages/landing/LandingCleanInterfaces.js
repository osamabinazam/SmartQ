import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

export default function LandingCleanInterfaces() {
  return <RootStyle />;
}
