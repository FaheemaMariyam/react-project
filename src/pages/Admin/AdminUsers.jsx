// // import React,{useState,useEffect} from 'react'
// // import axios from 'axios';
// // function AdminUsers() {
// //   const [user, setUser] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:3000/users")
// //       .then((res) => setUser(res.data))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   const toggleBlock=(us)=>{
// //   const updatedUser={...us,blocked:!us.blocked};
// //   axios.patch(`http://localhost:3000/users/${us.id}`,updatedUser)
// //   .then(()=>setUser(user.map((u)=>u.id===us.id ? updatedUser : u)))
// //   .catch(err=>console.error(err))
// //   }
// //   const removeUser=(us)=>{
// //     axios.delete(`http://localhost:3000/users/${us.id}`)
// //     .then(()=>setUser(user.filter((u)=>u.id!==us.id)))
// //     .catch(err=>console.error(err))
// //   }
// //   return (
// //     <div>
// //       {user.map((us) => (
// //         <div key={us.id}>
// //           <div
// //             style={{
// //               border: "1px solid gray",
// //               margin: "10px",
// //               padding: "10px",
// //             }}
// //           >
// //            Name: {us.username}
// //            Phone: {us.phone}
// //            Address: {us.address}
// //             Pin:{us.pin}
// //             <button onClick={()=>toggleBlock(us)}>{us.blocked ? "Unblock" : "Block"}</button>
// //             <button onClick={()=>removeUser(us)}>Remove</button>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default AdminUsers
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import "./AdminUsers.css";  // import CSS file

// // function AdminUsers() {
// //   const [user, setUser] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:3000/users")
// //       .then((res) => setUser(res.data))
// //       .catch((err) => console.error(err));
// //   }, []);

// //   const toggleBlock = (us) => {
// //     const updatedUser = { ...us, blocked: !us.blocked };
// //     axios
// //       .patch(`http://localhost:3000/users/${us.id}`, updatedUser)
// //       .then(() =>
// //         setUser(user.map((u) => (u.id === us.id ? updatedUser : u)))
// //       )
// //       .catch((err) => console.error(err));
// //   };

// //   const removeUser = (us) => {
// //     axios
// //       .delete(`http://localhost:3000/users/${us.id}`)
// //       .then(() => setUser(user.filter((u) => u.id !== us.id)))
// //       .catch((err) => console.error(err));
// //   };

// //   return (
// //     <div className="admin-users-container">
// //       <h2 className="admin-users-title">Manage Users</h2>

// //       <div className="user-grid">
// //         {user.map((us) => (
// //           <div className="user-card" key={us.id}>
// //             <p><strong>Name:</strong> {us.username}</p>
// //             <p><strong>Phone:</strong> {us.phone}</p>
// //             <p><strong>Address:</strong> {us.address}</p>
// //             <p><strong>Pin:</strong> {us.pin}</p>

// //             <div className="user-actions">
// //               <button
// //                 className={`btn ${us.blocked ? "btn-brown" : "btn-pink"}`}
// //                 onClick={() => toggleBlock(us)}
// //               >
// //                 {us.blocked ? "Unblock" : "Block"}
// //               </button>
// //               <button
// //                 className="btn btn-remove"
// //                 onClick={() => removeUser(us)}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminUsers;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminUsers.css";

// function AdminUsers() {
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users")
//       .then((res) => setUser(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const toggleBlock = (us) => {
//     const updatedUser = { ...us, blocked: !us.blocked };
//     axios
//       .patch(`http://localhost:3000/users/${us.id}`, updatedUser)
//       .then(() => setUser(user.map((u) => (u.id === us.id ? updatedUser : u))))
//       .catch((err) => console.error(err));
//   };

//   const removeUser = (us) => {
//     axios
//       .delete(`http://localhost:3000/users/${us.id}`)
//       .then(() => setUser(user.filter((u) => u.id !== us.id)))
//       .catch((err) => console.error(err));
//   };
//   const [searchTerm, setSearchTerm] = useState("");
//   const search = user.filter((us) =>
//     `${us.username}${us.address}${us.phone}${us.id}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );
//   return (
//     <div className="admin-users-container">
//       <input
//       className="search-input"
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <h2 className="admin-users-title">User Management</h2>

//       <table className="user-table">
//         <thead>
//           <tr>
//             <th></th>
//             <th>User ID</th>
//             <th>User Name</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Pin</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {search.length
//           >0?
//         (search.map((us, index) => (
//             <tr key={us.id}>
//               <td>{index + 1}</td>
              
//               <td>{us.id}</td>
//               <td>{us.username}</td>
//               <td>{us.phone}</td>
//               <td>{us.address}</td>
//               <td>{us.pin}</td>
//               <td>
//                 <span className={`status ${us.blocked ? "blocked" : "active"}`}>
//                   {us.blocked ? "Blocked" : "Active"}
//                 </span>
//               </td>
//               <td>
//                 <button
//                   className={`btn ${us.blocked ? "btn-brown" : "btn-pink"}`}
//                   onClick={() => toggleBlock(us)}
//                 >
//                   {us.blocked ? "Unblock" : "Block"}
//                 </button>
//                 <button
//                   className="btn btn-remove"
//                   onClick={() => removeUser(us)}
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
          
//           ))): (
//             <tr>
//               <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
//                 No user found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminUsers;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleBlock = (user) => {
    const updatedUser = { ...user, blocked: !user.blocked };
    axios
      .patch(`http://localhost:3000/users/${user.id}`, updatedUser)
      .then(() =>
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)))
      )
      .catch((err) => console.error(err));
  };

  const removeUser = (user) => {
    axios
      .delete(`http://localhost:3000/users/${user.id}`)
      .then(() => setUsers(users.filter((u) => u.id !== user.id)))
      .catch((err) => console.error(err));
  };

  const filteredUsers = users.filter((user) =>
    `${user.username}${user.phone}${user.address}${user.pin}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-users">
      <h2 className="heading">User Management</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.pin}</td>
                <td>
                  <span className={`status-badge ${user.blocked ? "blocked" : "active"}`}>
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="action-buttons">
                  <button
                    className={`btn btn-block ${user.blocked ? "blocked" : "active"}`}
                    onClick={() => toggleBlock(user)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button className="btn btn-remove" onClick={() => removeUser(user)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
