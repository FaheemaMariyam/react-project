import React, { useState, useEffect } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users with pagination and optional search
  const fetchUsers = () => {
    let url = `/admin/users/?page=${page}`;
    if (debouncedSearch) url += `&search=${debouncedSearch}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setUsers(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.error(err));
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to first page on new search
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Refetch whenever page or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pin</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1 + (page - 1) * 10}</td>
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

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="pagination-btn"
          disabled={page >= totalPages}
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminUsers;
