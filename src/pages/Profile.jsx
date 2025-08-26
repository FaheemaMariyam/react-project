import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import './Profile.css'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const {user}=useContext(AuthContext);
    const navigate=useNavigate()
    
    if(!user) {return <p>Please login first to countinue</p>
      
    }
  return (
    <div className='profile-container'>
        <Navbar/>
      <div className='profile-card'>
       
            <h2>My Profile</h2>
            <div className='profile-details'>
            <p><strong>Full Name:</strong>{user.username}</p>
             <p><strong>Phone:</strong>{user.phone}</p>
              <p><strong>Address:</strong>{user.address}</p>
               <p><strong>PIN:</strong>{user.pin}</p>
                <p><strong>Email:</strong>{user.email}</p>
                  {/* <button className='logout-btn' onClick={()=>navigate("/logout")}>Logout</button> */}
        </div>

      </div>
    
    </div>
  )
}

export default Profile
