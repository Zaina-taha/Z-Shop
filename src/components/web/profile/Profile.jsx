import React, { useContext } from 'react'
import './Profile.css'
import { userContext } from './../context/User';
import { Link, Outlet } from 'react-router-dom';


export default function Profile() {

    return (
        <aside className='d-flex'>
            <div>
                <nav className="nav flex-column vh-100 bg-info w-100">
                    <Link className="nav-link active" aria-current="page" to=''>User Info</Link>
                    <Link className="nav-link" to='contact'>User Contact</Link>
                    <Link className="nav-link" to='getOrder'> orders</Link>


                </nav>
            </div>
            <div>
                <Outlet/>
            </div>

        </aside>
    )
}
