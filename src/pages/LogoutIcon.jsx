// import React, { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext';
// import { FaSignOutAlt } from 'react-icons/fa';
// function LogoutIcon() {
//     const navigate=useNavigate();
//     const{logout}=useContext(AuthContext)
//      const handleLogout=()=>{
//       logout();
//       navigate("/")
//      }
//     // useEffect(()=>{
//     //     logout();
//     //     navigate("/")
//     // },[logout,navigate])
//   return (
//     <>
     
//       <FaSignOutAlt onClick={handleLogout} /></>
  
//   )
// }

// export default LogoutIcon
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';

function LogoutIcon({ className }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <span className={className} onClick={handleLogout} style={{ cursor: 'pointer' }}>
      <FaSignOutAlt />
    </span>
  );
}


export default LogoutIcon;
