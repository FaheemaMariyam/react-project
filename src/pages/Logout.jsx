import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function Logout() {
    const navigate=useNavigate();
    const{logout}=useContext(AuthContext)
    useEffect(()=>{
        logout();
        navigate("/login")
    },[logout,navigate])
  return (
    <p>Logging out...</p>
  )
}

export default Logout
