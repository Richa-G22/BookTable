import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
//import Splash from '../components/Splash';
import AllRestaurants from '../components/Restaurants/AllRestaurants';
import DetailedRestaurant from '../components/Restaurants/DetailedRestaurant';
import GetCurrUserRestaurants from '../components/Restaurants/GetCurrUserRestaurants';
import NewRestaurant from '../components/Restaurants/NewRestaurant';
import EditRestaurant from '../components/Restaurants/EditRestaurant';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllRestaurants />,
      },
      {
        path: "/restaurants",
        element: <AllRestaurants />,
      },
      {
        path: "/restaurants/:restaurantId",
        element: <DetailedRestaurant />,
      },
      {
        path: "/restaurants/current",
        element: <GetCurrUserRestaurants />,
      },
      {
        path: "/restaurants/new",
        element: <NewRestaurant />,
      },
      {
        path: "/restaurants/update/:id",
        element: <EditRestaurant />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },

]);
