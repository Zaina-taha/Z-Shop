import React, { useEffect } from 'react'
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Register from "./components/web/register/Register.jsx";
import Login from "./components/web/login/Login.jsx";
import Home from "./components/web/home/Home.jsx";
import Categories from "./components/web/categories/Categories.jsx";
import DashBoardHome from './components/dashboard/home/Home';
import DashBoardCategories from './components/dashboard/categories/Categoriess';
import { useState } from "react";
import {jwtDecode} from 'jwt-decode';
import DashboardLayout from './layouts/DashboardLayout';
export default function App() {


  const [user,setUser] = useState(null);
  const saveCurrentUser = ()=>{
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUser(decoded);
  }

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      saveCurrentUser();
    }
  },[])


  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout user={user} setUser={setUser} />,
      children:[
          {
            path:'register',
            element:<Register />
          },
          {
            path:'login',
            element:<Login saveCurrentUser={saveCurrentUser} />
          },
          {
            index:true,
            element:<Home />
          },
          {
            path:'categories',
            element:<Categories />
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
  return (
    <RouterProvider router={router} />
  )
}



