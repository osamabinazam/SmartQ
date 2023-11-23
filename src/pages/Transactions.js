// // material
// import { Container, Typography } from '@mui/material';
// // hooks
// import useSettings from '../hooks/useSettings';
// // components
// import Page from '../components/Page';

// // ----------------------------------------------------------------------

// export default function PageTwo() {
//   const { themeStretch } = useSettings();

//   return (
//     <Page title="Page Two | Minimal-UI">
//       <Container maxWidth={themeStretch ? false : 'xl'}>
//         <Typography variant="h3" component="h1" paragraph>
//           Transe
//         </Typography>
//         <Typography gutterBottom>
//           Curabitur turpis. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod
//           ligula urna in dolor. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Phasellus blandit leo
//           ut odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id
//           purus. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In consectetuer turpis ut velit.
//           Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.
//           Vestibulum suscipit nulla quis orci. Nam commodo suscipit quam. Sed a libero.
//         </Typography>
//         <Typography>
//           Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius laoreet. Curabitur
//           ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat. Donec mi odio, faucibus at,
//           scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque libero metus, condimentum nec, tempor a, commodo
//           mollis, magna. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Cras dapibus.
//         </Typography>
//       </Container>
//     </Page>
//   );
// }


// material
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import {
  BankingIncome,
  BankingExpenses,
  BankingContacts,
  BankingInviteFriends,
  BankingQuickTransfer,
  BankingCurrentBalance,
  BankingBalanceStatistics,
  BankingRecentTransitions,
  BankingExpensesCategories
} from '../components/general-banking';

// ----------------------------------------------------------------------

export default function PageTwo() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Banking | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <BankingIncome />
              <BankingExpenses />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <BankingCurrentBalance />
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <BankingBalanceStatistics />
              <BankingExpensesCategories />
              <BankingRecentTransitions />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <BankingQuickTransfer />
              <BankingContacts />
              <BankingInviteFriends />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

