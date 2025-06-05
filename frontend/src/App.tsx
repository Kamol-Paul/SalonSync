import { createBrowserRouter, useLocation, Outlet } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage.tsx';
import RegistrationPage from './pages/registrationPage/RegistrationPage.tsx';
import LoginPage from './pages/loginPage/LoginPage.tsx';
import { MainDashboard as CustomerDashboard } from './pages/customerDashboard/mainDashboard.tsx';
import { MainDashboard as SalonDashboard } from './pages/salonDashboard/mainDashboard.tsx';
import { MainDashboard as AdminDashboard } from './pages/adminDashboard/mainDashboard.tsx';
import Header from './components/header/Header.tsx';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }} // Slightly changed for a subtle slide-in
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} // Slightly changed for a subtle slide-out
          transition={{ duration: 0.3 }} // Faster transition
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AnimatedRoutes />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/register', element: <RegistrationPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/customer-dashboard', element: <CustomerDashboard /> },
      { path: '/salon-dashboard', element: <SalonDashboard /> },
      { path: '/admin-dashboard', element: <AdminDashboard /> },
    ],
  },
]);
