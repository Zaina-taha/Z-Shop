import Layout from "./Layout";
import Home from "../components/web/home/Home";
import Categories from "../components/web/categories/Categories";
import DashBoardHome from '../components/dashboard/home/Home';
import DashBoardCategories from '../components/dashboard/categories/Categoriess';
import DashboardLayout from "./DashboardLayout";
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register";
import Login from "../components/web/login/Login";
import CategoriesDetails from "../components/web/categories/CategoriesDetails";
import Products from './../components/web/products/Products';
import Cart from './../components/web/cart/Cart';
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute";
import Profile from './../components/web/profile/Profile';
import SendCode from "../components/web/sendCode/SendCode";
import ForgotPassword from "../components/web/forgotPassword/ForgotPassword";
import UserInfo from "../components/web/profile/UserInfo";
import UserContact from "../components/web/profile/UserContact";
import CreateOrder from "../components/web/createOrder/CreateOrder";
import GetOrder from "../components/web/getOrder/GetOrder";


export const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:<Login/>},
        {
          index:true,
          element:<Home />
        },
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'products/category/:categoryId',
          element:<CategoriesDetails/>
        },
        {
          path:'products/:productId',
          element:<Products/>
        },
        {
          path:'cart',
          element:
          <ProtectedRoute>
          <Cart/>
          </ProtectedRoute>
        },
        {
          path:'profile',
          element:
          <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>,
          children:[
            {
              index:true,
              element:<UserInfo/>
            },
            {
              path:'contact',
              element:<UserContact/>
            },
          ]
        },
        {
          path:'sendCode',
          element:<SendCode/>
        },
        {
          path:'forgotPassword',
          element:<ForgotPassword/>
        },
        {
          path:'createOrder',
          element:<CreateOrder/>
        },
        {
          path:'getOrder',
          element:<GetOrder/>
        },
        {
          path:'*',
          element:<h2>page not found --- web</h2>
        }
    ]
  },
  {
      path:'/dashboard',
      element:<DashboardLayout />,
      children:[{
      path:'home',
      element:<DashBoardHome />
    }
    ,{
      path:'categories',
      element:<DashBoardCategories />
    },
    {
      path:'*',
      element:<h2>page not found --- dashboard</h2>
    }
  ]

  }
]);