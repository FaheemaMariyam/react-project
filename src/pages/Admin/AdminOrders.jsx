import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
import "./AdminOrders.css";
import { Eye } from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch orders from backend with pagination & search
  const fetchOrders = () => {
    let url = `/admin/orders/?page=${page}`;
    if (debouncedSearch) url += `&search=${debouncedSearch}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setOrders(res.data.results || res.data);
        setTotalPages(Math.ceil(res.data.count / 10)); // adjust if page_size changes
      })
      .catch((err) => console.error(err));
  };

 useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
    setPage(1);
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
  fetchOrders();
}, [page, debouncedSearch]);

  // Update order status
  const updateStatus = (id, newStatus) => {
    axiosInstance
      .patch(`/admin/orders/${id}/status/`, { status: newStatus })
      .then((res) => {
        const updatedOrder = res.data;
        setOrders((prev) =>
          prev.map((ord) => (ord.id === id ? { ...ord, ...updatedOrder } : ord))
        );
      })
      .catch((err) => console.error(err));
  };

  // Filter orders based on status
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((ord) => ord.status?.toLowerCase() === filter);

  return (
    <div className="admin-orders">
      <h2 className="heading">Order Management</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by user or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button onClick={() => { setPage(1); fetchOrders(); }}>Search</button> */}
      </div>

      {/* Tabs */}
      <div className="tabs">
        {["all", "pending","processing", "shipped", "delivered", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`tab-btn ${filter === tab ? "active" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>User</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((ord, index) => (
            <tr key={`${ord.id}-${index}`}>
              <td>{index + 1}</td>
              <td>{ord.user.name} (id-{ord.user.id})</td>
              <td>
                {ord.items.map((item) => (
                  <div key={item.id}>
                    {item.product.name} x{item.quantity}
                  </div>
                ))}
              </td>
              <td>₹{ord.total_price}</td>
              <td>{ord.payment_method || "CASH"}</td>
              <td>
                <span className={`status-badge ${ord.status?.toLowerCase()}`}>
                  {ord.status}
                </span>
              </td>
              <td className="action-buttons">
                <select
                  value={ord.status}
                  onChange={(e) => updateStatus(ord.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  className="eye-btn"
                  onClick={() => setSelectedOrder(ord)}
                >
                  <Eye size={18} />
                </button>
              </td>
              <td>{ord.ordered_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content wide"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-x" onClick={() => setSelectedOrder(null)}>
              ✖
            </button>

            <h3 className="modal-title">Order Details</h3>

            <div className="modal-body">
              <div className="modal-img">
                {selectedOrder.items[0]?.product.image && (
                  <img
                    src={selectedOrder.items[0].product.image}
                    alt={selectedOrder.items[0].product.name}
                  />
                )}
              </div>

              <div className="modal-info">
                <div className="info-section">
                  <h4>Order Info</h4>
                  <p>
                    <span>Order ID:</span> {selectedOrder.id}
                  </p>
                  <p>
                    <span>User:</span> {selectedOrder.user.name} (
                    {selectedOrder.user.id})
                  </p>
                  <p>
                    <span>Product:</span>{" "}
                    {selectedOrder.items
                      .map((item) => `${item.product.name} x${item.quantity}`)
                      .join(", ")}
                  </p>
                  <p>
                    <span>Price:</span> ₹{selectedOrder.total_price}
                  </p>
                  <p>
                    <span>Payment:</span>{" "}
                    {selectedOrder.payment_method || "CASH"}
                  </p>
                  <p>
                    <span>Status:</span> {selectedOrder.status}
                  </p>
                  <p>
                    <span>Date:</span> {selectedOrder.ordered_at}
                  </p>
                </div>

                <div className="info-section">
                  <h4>Customer Info</h4>
                  <p>
                    <span>Name:</span> {selectedOrder.name}
                  </p>
                  <p>
                    <span>Address:</span> {selectedOrder.address}
                  </p>
                  <p>
                    <span>City:</span> {selectedOrder.city}
                  </p>
                  <p>
                    <span>PIN:</span> {selectedOrder.pin}
                  </p>
                  <p>
                    <span>Phone:</span> {selectedOrder.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
