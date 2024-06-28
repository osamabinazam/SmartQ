import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
// import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundLocationOn from '@iconify/icons-ic/round-location-on';
//import clock icon
import clockFill from '@iconify/icons-eva/clock-fill';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';
// redux
import { useDispatch , useSelector } from '../../redux/store';
import {  getProfile, getCategories } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  // AccountBilling,
  AccountSocialLinks,
  // AccountNotifications,
  AccountChangePassword,
  AccountLocation,
  AccountService,
  AccountOpertatingHours
} from '../../components/_dashboard/user/account';



// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();
  const { myProfile:profile, services, locations,
    //  educations,
      socialmedialinks, operatinghours } = useSelector((state) => state.user);

  

  

  useEffect(() => {
    // dispatch(getCards());
    // dispatch(getAddressBook());
    // dispatch(getInvoices());
    // dispatch(getNotifications());
    dispatch(getProfile());
    dispatch(getCategories());
    
  }, [dispatch]);


  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral profile={profile} />
    },
    // {
    //   value: 'billing',
    //   icon: <Icon icon={roundReceipt} width={20} height={20} />,
    //   component: <AccountBilling />
    // },

    //my routes
    {
      value: 'location',
      icon: <Icon icon={roundLocationOn} width={20} height={20} />,
      component: <AccountLocation profile={locations} />
    },
    {
      value: 'service',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountService profile={services} />
    },
    {
      value: 'Operating Hours',
      icon: <Icon icon={clockFill} width={20} height={20} />,
      component: <AccountOpertatingHours profile={operatinghours} />
    },

    //end of my routes



    // {
    //   value: 'notifications',
    //   icon: <Icon icon={bellFill} width={20} height={20} />,
    //   component: <AccountNotifications />
    // },
    {
      value: 'social_links',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks profile={socialmedialinks} />
    },
    {
      value: 'change_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword profile={profile} />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="User: Account Settings | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' }
          ]}
        />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
