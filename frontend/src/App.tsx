import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage.tsx';

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
]);
