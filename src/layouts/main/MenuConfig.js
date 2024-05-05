import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import aboutFill from '@iconify/icons-eva/info-fill'; // Add this import for the "About" icon
// routes
// import { PATH_DASHBOARD } from '../../routes/paths';
import { PATH_LANDING } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />
  },
  // { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: 'About', path:PATH_LANDING.about, icon: <Icon icon={aboutFill} {...ICON_SIZE} /> },
  { title: 'Contact', path: PATH_LANDING.contact, icon: <Icon icon={fileFill} {...ICON_SIZE} />}
];

export default menuConfig;


// import { Icon } from '@iconify/react';
// import homeFill from '@iconify/icons-eva/home-fill';
// import fileFill from '@iconify/icons-eva/file-fill';
// import infoFill from '@iconify/icons-eva/info-fill'; // Add this import for the "About" icon
// import mailFill from '@iconify/icons-eva/mail-fill'; // Add this import for the "Contact" icon

// // routes
// import { PATH_DASHBOARD } from '../../routes/paths';

// // ----------------------------------------------------------------------

// const ICON_SIZE = {
//   width: 22,
//   height: 22
// };

// const menuConfig = [
//   {
//     title: 'Home',
//     path: '/',
//     icon: <Icon icon={homeFill} {...ICON_SIZE} />
//   },
//   { title: 'Dashboard', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
//   { title: 'About', path: '/about', icon: <Icon icon={infoFill} {...ICON_SIZE} /> },
//   { title: 'Contact', path: '/contact', icon: <Icon icon={mailFill} {...ICON_SIZE} /> }
// ];

// export default menuConfig;

