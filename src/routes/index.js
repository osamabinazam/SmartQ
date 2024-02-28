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
  const LoadablePageFour = Loadable(lazy(() => import('../pages/PageFour')), pathname);
  const LoadablePageFive = Loadable(lazy(() => import('../pages/PageFive')), pathname);
  const LoadablePageSix = Loadable(lazy(() => import('../pages/PageSix')), pathname);
  const LoadableNotFound = Loadable(lazy(() => import('../pages/Page404')), pathname);
  const LoadableLandingPage = Loadable(lazy(() => import('../pages/LandingPage')), pathname);

  return useRoutes([
    {
      path: 'auth',
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
        { path: 'new-password', element: <NewPasswordForm /> } 
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
        // Other dashboard routes...
      ]
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <LoadableNotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LoadableLandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
