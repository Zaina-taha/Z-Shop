import Layout from "./Layout";
import Home from "../components/web/home/Home";
import Categories from "../components/web/categories/Categories";
import DashBoardHome from '../components/dashboard/home/Home';
import DashBoardCategories from '../components/dashboard/categories/Categoriess';
import DashboardLayout from "./DashboardLayout";
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register";
import Login from "../components/web/login/Login";

export const router = createBrowserRouter([
    {

      path: "/",
      element:<Layout/>,
      children:[
        {
        path:'register',
        element:<Register/>
        },
        {
          path:'login',
          element:<Login/>
          },
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'categories',
          element:<Categories/>
        },
      ]
    },
    {
      path: "/dashboard",
      element:<DashboardLayout/>,
      children:[
        {
          path:'home',
          element:<DashBoardHome/>
        },
        {
          path:'categories',
          element:<DashBoardCategories/>
        },
      ]
    },
  ]);