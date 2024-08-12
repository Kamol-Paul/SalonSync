import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage.tsx';
import RegistrationPage from './pages/registrationPage/RegistrationPage.tsx';
import LoginPage from './pages/loginPage/LoginPage.tsx';
import MainDashboard from './pages/customerDashboard/mainDashboard.tsx';

export const routes = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/register', element: <RegistrationPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/customer-dashboard', element: <MainDashboard /> },
]);



// import Header from './components/header/Header.tsx';
// import { useLocation, Outlet } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';

// const AnimatedRoutes = () => {
//   const location = useLocation();

//   return (
//     <>
//       <Header></Header>
//       <AnimatePresence mode="wait">

//         <motion.div
//           key={location.pathname}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Outlet />
//         </motion.div>
//       </AnimatePresence>
//     </>
//   );
// };

// export default AnimatedRoutes;


// export const routes = createBrowserRouter([
//   {
//     path: '/',
//     element: <AnimatedRoutes />,
//     children: [
//       { path: '/', element: <HomePage /> },
//       { path: '/register', element: <RegistrationPage /> }
//     ]
//   }
// ]);



