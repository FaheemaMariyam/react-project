import React, { useState, useEffect } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchUsers = () => {
    axiosInstance
      .get(`/admin/users/?search=${debouncedSearch}`)
      .then((res) => setUsers(res.data.results))
      .catch((err) => console.error(err));
  };

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400); // delay same as product page

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch when debouncedSearch updates
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch]);

  const toggleBlock = (user) => {
    axiosInstance
      .patch(`/admin/users/${user.id}/`, { blocked: !user.blocked })
      .then(fetchUsers)
      .catch(console.error);
  };

  const removeUser = (user) => {
    axiosInstance
      .delete(`/admin/users/${user.id}/`)
      .then(fetchUsers)
      .catch(console.error);
  };

  const filteredUsers = users.filter((u) => u.role !== "admin");

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
                <td>{user.name}</td>
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
              <td colSpan="9" style={{ textAlign: "center", padding: "15px" }}>
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
