import React, { useContext } from 'react'
import './Profile.css'
import { userContext } from './../context/User';


export default function Profile() {
    let{userData}=useContext(userContext);
    console.log(userData);

    return (
      
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4"> <div className=" image d-flex flex-column justify-content-center align-items-center">
                {userData?(
                    <>
                <button className="btn btn-secondary"> 
                <img src={userData.user.image.secure_url} height={100} width={100} /></button>
                <span className="name mt-3">{userData.user.userName}</span> 
                <span className="idd">{userData.user.email}</span>
                 <div className="text mt-3"> <span>Role:{userData.user.role}</span> </div>
              
                <div className=" px-2 rounded mt-4 date "> <span className="join">Joined {userData.user.createdAt}</span>
                </div> 
                
                </>
                ):"No Data"}
                </div>
            </div>
        </div>

    )
}
