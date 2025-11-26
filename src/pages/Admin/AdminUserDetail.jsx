import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminUserDetail.css";

function AdminUserDetail() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  // Fetch user details
  useEffect(() => {
    axiosInstance
      .get(`/admin/users/${id}/details/`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error loading user:", err));
  }, [id]);

  if (!userData) return <h3>Loading...</h3>;

  return (
    <div className="admin-user-detail container">
  {/* existing code */}


    <div className="container mt-4">
      <h2>User Detail</h2>
      <hr />

      <h4>Personal Info</h4>
      <p><strong>Name:</strong> {userData?.name}</p>
      <p><strong>Email:</strong> {userData?.email}</p>
      <p><strong>Phone:</strong> {userData?.phone}</p>
      <p><strong>Address:</strong> {userData?.address}</p>
      <p><strong>PIN:</strong> {userData?.pin}</p>

      <hr />
      <h4>Orders</h4>

      {userData?.orders?.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        userData?.orders?.map((order) => (
          <div key={order.id} className="card p-3 mb-3">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total_price}</p>

            <h6>Items:</h6>
            <ul>
              {order.items?.map((item, index) => (
                <li key={index}>
                  {item.product_name} — {item.quantity} pcs — ₹{item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default AdminUserDetail;
