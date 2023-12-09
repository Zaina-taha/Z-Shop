import React, { useEffect } from 'react'
import {RouterProvider,} from "react-router-dom";
import  { useContext } from 'react'
import { CartContextProvider } from './components/web/context/Cart.jsx';
import {userContext } from './components/web/context/User.jsx';
import {router}from './layouts/Routes.jsx'

export default function App() {
  let{setUserToken}=useContext(userContext);
  const setTokenfunc=()=>{
    if(localStorage.getItem("userToken") != null){
      setUserToken(localStorage.getItem("userToken"));
    }
  }
  useEffect(()=>{
    setTokenfunc();
  },[])

  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  )
}



