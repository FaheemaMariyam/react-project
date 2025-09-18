import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://dbrender-liu7.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleBlock = (user) => {
    const updatedUser = { ...user, blocked: !user.blocked };
    axios
      .patch(`https://dbrender-liu7.onrender.com/users/${user.id}`, updatedUser)
      .then(() =>
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)))
      )
      .catch((err) => console.error(err));
  };

  const removeUser = (user) => {
    axios
      .delete(`https://dbrender-liu7.onrender.com/users/${user.id}`)
      .then(() => setUsers(users.filter((u) => u.id !== user.id)))
      .catch((err) => console.error(err));
  };

  const filteredUsers =users.filter((user)=>user.role!=="admin")
   .filter((user) =>
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
            <th></th>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
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
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.pin}</td>
                <td>
                  <span
                    className={`status-badge ${
                      user.blocked ? "blocked" : "active"
                    }`}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="action-buttons">
                  <button
                    className={`btn btn-block ${
                      user.blocked ? "blocked" : "active"
                    }`}
                    onClick={() => toggleBlock(user)}
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    className="btn btn-remove"
                    onClick={() => removeUser(user)}
                  >
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
