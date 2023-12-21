import React, { useContext } from 'react'
import './Profile.css'

import { userContext } from '../context/User'

export default function UserInfo() {
  const { userData, loader } = useContext(userContext);
  if (loader) {
    return "Loading.."
  }

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
          {userData ? (
            <>
              <button className="btn btn-secondary">
                <img src={userData.user.image.secure_url} height={100} width={100} /></button>
              <span className="name mt-3">{userData.user.userName}</span>
            </>
          ) : "No Data"}
        </div>
      </div>
    </div>
  )
}
