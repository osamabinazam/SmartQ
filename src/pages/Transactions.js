
// material
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import {
  BankingIncome,
  BankingExpenses,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories
} from '../components/general-banking';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
// ----------------------------------------------------------------------

export default function PageTwo() {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }

    if (isAuthenticated && user?.usertype !== 'vendor') {
      navigate('/auth/401', { replace: true });
    }
  }
  , [isAuthenticated, navigate, user.usertype]);

  return (
    <Page title="Transactions | SmartQ">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingIncome />
              <BankingExpenses />
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={5}>
            <BankingCurrentBalance />
          </Grid> */}

          <Grid item xs={12} >
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
              <BankingRecentTransitions />
            </Stack>
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingQuickTransfer />
              <BankingContacts />
              <BankingInviteFriends />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

