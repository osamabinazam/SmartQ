import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import LoadingScreen from '../components/LoadingScreen';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import ResetPassword from '../pages/authentication/ResetPassword';
import VerifyCode from '../pages/authentication/VerifyCode';
import NewPasswordForm from '../pages/authentication/NewPasswordForm';
import Request from '../pages/Request';
import PageFive from '../pages/PageFive';
import LandingPage from '../pages/LandingPage';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Page404 from '../pages/Page404';

const Loadable = (Component) => {
  return (props) => <Suspense fallback={<LoadingScreen />}><Component {...props} /></Suspense>;
};

export default function Router() {
  const { pathname } = useLocation();

  // Loadable components
  const LoadablePageOne = Loadable(lazy(() => import('../pages/Home')));
  const LoadablePageTwo = Loadable(lazy(() => import('../pages/Transactions')));
  const LoadablePageThree = Loadable(lazy(() => import('../pages/Queues')));
  const LoadablePageFour = Loadable(lazy(() => import('../pages/PageFour')));
  const LoadablePageSix = Loadable(lazy(() => import('../pages/PageSix')));
  const LoadableNotFound = Loadable(lazy(() => import('../pages/Page404')));
  const LoadableLandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
  const LoadableRequestPage = Loadable(lazy(() => import('../pages/Request')));

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
        { path: 'request', element: <Request /> },
        { path: 'page-five', element: <PageFive /> },
        
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
        { path: '404', element: <LoadableNotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
