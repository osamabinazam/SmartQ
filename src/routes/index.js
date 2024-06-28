import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import Login from 'src/pages/authentication/Login';
import Register from 'src/pages/authentication/Register';
import ResetPassword from 'src/pages/authentication/ResetPassword';
import VerifyCode from 'src/pages/authentication/VerifyCode';
import NewPasswordForm from 'src/pages/authentication/NewPasswordForm';
import Request from 'src/pages/Request';

// ----------------------------------------------------------------------

const Loadable = (Component) => {
  return (props) => <Suspense fallback={<LoadingScreen />}><Component {...props} /></Suspense>;
};

export default function Router() {
  const { pathname } = useLocation();

  // Loadable components
  const LoadablePageOne = Loadable(lazy(() => import('../pages/Home')), pathname);
  const LoadablePageTwo = Loadable(lazy(() => import('../pages/Transactions')), pathname);
  const LoadablePageThree = Loadable(lazy(() => import('../pages/Queues')), pathname);
  // const LoadablePageFour = Loadable(lazy(() => import('../pages/PageFour')), pathname);
  // const LoadablePageFive = Loadable(lazy(() => import('../pages/PageFive')), pathname);
  // const LoadablePageSix = Loadable(lazy(() => import('../pages/PageSix')), pathname);
  const LoadableNotFound = Loadable(lazy(() => import('../pages/Page404')), pathname);
  const LoadablePage401 = Loadable(lazy(() => import('../pages/Page401')), pathname);
  // const LoadableLandingPage = Loadable(lazy(() => import('../pages/LandingPage')), pathname);
  // const LoadableRequestPage = Loadable(lazy(() => import('../pages/Request')), pathname);
  const LoadableUserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')), pathname);
  // const LoadableUserCards = Loadable(lazy(() => import('../pages/UserCards')), pathname);
  // const LoadableUserList = Loadable(lazy(() => import('../pages/UserList')), pathname);
  // const LoadableUserCreate = Loadable(lazy(() => import('../pages/UserCreate')), pathname);
  const LoadableUserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')), pathname);
  const LoadableServices = Loadable(lazy(() => import('../pages/Services')));
  const LoadableHistory = Loadable(lazy(() => import('../pages/History')));


  return useRoutes([
    {
      path: 'auth',
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'new-password', element: <NewPasswordForm /> } ,
        { path: '401', element: <LoadablePage401 />}
      ]
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: 'home', element: <LoadablePageOne /> },
        { path: 'transactions', element: <LoadablePageTwo /> },
        { path: 'queue', element: <LoadablePageThree /> },
        { path: 'request', element: <Request /> },
        { path: 'history', element: <LoadableHistory /> },
        {path: 'services', element: <LoadableServices />},
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <LoadableUserProfile /> },
            // { path: 'cards', element: <UserCards /> },
            // { path: 'list', element: <UserList /> },
            // { path: 'new', element: <UserCreate /> },
            // { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <LoadableUserAccount /> }
          ]
        },
     
      ]
    },
    // Landing Page 
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <LandingPage /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <LoadableNotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [{ element: <LandingPage /> }]
    // },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// // Dashboard
// const PageOne = Loadable(lazy(() => import('../pages/Home')));
// const PageTwo = Loadable(lazy(() => import('../pages/Transactions')));
// const PageThree = Loadable(lazy(() => import('../pages/Queues')));
// const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
// const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
// const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
// const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// Landing 
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
