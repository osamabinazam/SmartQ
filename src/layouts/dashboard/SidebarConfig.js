import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  ser: getIcon('ic_user'),
  ecommerce: getIcon('queue-svgrepo-com'),
  analytics: getIcon('product-request-svgrepo-com'),
  dashboard: getIcon('icons8-home'),
  product: getIcon('payment-methods-svgrepo-com'),
 history:  getIcon('data-sync-file-icon'),

};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Home', path: PATH_DASHBOARD.general.home, icon: ICONS.dashboard },
      { title: 'Manage Queue', path: PATH_DASHBOARD.general.queue, icon: ICONS.ecommerce },
      { title: 'Transactions', path: PATH_DASHBOARD.general.transactions, icon: ICONS.product },
      { title: 'Requests', path: PATH_DASHBOARD.general.request, icon: ICONS.analytics },
      { title: 'History', path: PATH_DASHBOARD.app.pageFive, icon: ICONS.history }
   //   { title: 'User', path: PATH_DASHBOARD.app.user, icon: ICONS.user } // Add the "User" item
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.app.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.app.pageFour },
  //         { title: 'Five', path: PATH_DASHBOARD.app.pageFive },
  //         { title: 'Six', path: PATH_DASHBOARD.app.pageSix }
  //       ]
  //     }
  //   ]
  // }
];

export default sidebarConfig;


    