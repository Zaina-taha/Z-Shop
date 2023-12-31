import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const userContext=createContext(null);
export function UserContextProvider({children}){

    let[userToken,setUserToken]=useState(null);
    let[userData,setUserData]=useState(null);
    let[loader,setLoader]=useState(true);

    const getUserData=async()=>{
       
            if(userToken){
                const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
                {headers:{authorization:`Tariq__${userToken}`}});
                setLoader(false);
                setUserData(data);
                
            }
    }

    useEffect(()=>{
        getUserData();
    },[userToken])
    return <userContext.Provider value={{userToken,setUserToken,userData,setUserData,loader}}>
        {children}
    </userContext.Provider>

}