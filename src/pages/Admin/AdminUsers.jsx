// import React,{useState,useEffect} from 'react'
// import axios from 'axios';
// function AdminUsers() {
//   const [user, setUser] = useState([]);
 
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users")
//       .then((res) => setUser(res.data))
//       .catch((err) => console.error(err));
//   }, []);
  
//   const toggleBlock=(us)=>{
//   const updatedUser={...us,blocked:!us.blocked};
//   axios.patch(`http://localhost:3000/users/${us.id}`,updatedUser)
//   .then(()=>setUser(user.map((u)=>u.id===us.id ? updatedUser : u)))
//   .catch(err=>console.error(err))
//   }
//   const removeUser=(us)=>{
//     axios.delete(`http://localhost:3000/users/${us.id}`)
//     .then(()=>setUser(user.filter((u)=>u.id!==us.id)))
//     .catch(err=>console.error(err))
//   }
//   return (
//     <div>
//       {user.map((us) => (
//         <div key={us.id}>
//           <div
//             style={{
//               border: "1px solid gray",
//               margin: "10px",
//               padding: "10px",
//             }}
//           >
//            Name: {us.username}
//            Phone: {us.phone}
//            Address: {us.address}
//             Pin:{us.pin}
//             <button onClick={()=>toggleBlock(us)}>{us.blocked ? "Unblock" : "Block"}</button>
//             <button onClick={()=>removeUser(us)}>Remove</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminUsers
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";  // import CSS file

function AdminUsers() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleBlock = (us) => {
    const updatedUser = { ...us, blocked: !us.blocked };
    axios
      .patch(`http://localhost:3000/users/${us.id}`, updatedUser)
      .then(() =>
        setUser(user.map((u) => (u.id === us.id ? updatedUser : u)))
      )
      .catch((err) => console.error(err));
  };

  const removeUser = (us) => {
    axios
      .delete(`http://localhost:3000/users/${us.id}`)
      .then(() => setUser(user.filter((u) => u.id !== us.id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-title">Manage Users</h2>

      <div className="user-grid">
        {user.map((us) => (
          <div className="user-card" key={us.id}>
            <p><strong>Name:</strong> {us.username}</p>
            <p><strong>Phone:</strong> {us.phone}</p>
            <p><strong>Address:</strong> {us.address}</p>
            <p><strong>Pin:</strong> {us.pin}</p>

            <div className="user-actions">
              <button
                className={`btn ${us.blocked ? "btn-brown" : "btn-pink"}`}
                onClick={() => toggleBlock(us)}
              >
                {us.blocked ? "Unblock" : "Block"}
              </button>
              <button
                className="btn btn-remove"
                onClick={() => removeUser(us)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
