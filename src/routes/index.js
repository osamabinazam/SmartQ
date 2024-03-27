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

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (

              <Login />

          )
        },
        {
          path: 'register',
          element: (

              <Register />

          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    // Dashboard Routes
    {

      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: 'home', element: <PageOne /> },
        { path: 'transactions', element: <PageTwo /> },
        { path: 'queue', element: <PageThree /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        {
          path: 'app',
          children: [
            { element: <Navigate to="/dashboard/app/four" replace /> },
            { path: 'four', element: <PageFour /> },
            { path: 'five', element: <PageFive /> },
            { path: 'six', element: <PageSix /> }
          ]
        }
      ]
    },
    // Landing Page 
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <LandingPage /> },
        { path: '/about', element: <About /> },
        { path: '/contact', element: <Contact /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
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

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/Home')));
const PageTwo = Loadable(lazy(() => import('../pages/Transactions')));
const PageThree = Loadable(lazy(() => import('../pages/Queues')));
const PageFour = Loadable(lazy(() => import('../pages/PageFour')));
const PageFive = Loadable(lazy(() => import('../pages/PageFive')));
const PageSix = Loadable(lazy(() => import('../pages/PageSix')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// Landing 
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
