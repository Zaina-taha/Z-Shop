import React, { useContext } from 'react'
import { userContext } from '../context/User';

export default function UserContact() {
    const{userData,loader}=useContext(userContext);
    if(loader){
        return "Loading.."
    }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div className="card p-4"> 
    <div className=" image d-flex flex-column justify-content-center align-items-center">     {userData?(
            <>
        
        <span className="idd">{userData.user.email}</span>
         <div className="text mt-3"> <span>Role:{userData.user.role}</span> </div>

        </>
        ):"No Data"}
          </div>
            </div>
        </div>
  )
}
