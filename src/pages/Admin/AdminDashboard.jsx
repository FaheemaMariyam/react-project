// import React from "react";

// import AdminUsers from "./AdminUsers";
// import AdminProducts from "./AdminProducts";
// import { Routes,Route,useNavigate } from "react-router-dom";


// function AdminDashboard() {
//   const navigate=useNavigate();
//   return(<div>
  
// <h2>Welcome to the Admin Panel</h2>
  

//   </div>


//   )

// }

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:3000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:3000/orders").then((res) => setOrders(res.data));
  }, []);

  // --- SUMMARY VALUES ---
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);

  // --- REVENUE TREND (Line chart) ---
  const revenueData = orders.map((o) => ({
    date: o.date,
    revenue: o.price,
  }));

  // --- ORDER STATUS (Pie chart) ---
  const statusCounts = ["pending", "shipped", "delivered", "cancelled"].map(
    (status) => ({
      name: status,
      value: orders.filter((o) => o.status?.toLowerCase() === status).length,
    })
  );

  const colors = ["#FFB6C1", "#FFDAB9", "#90EE90", "#87CEFA"];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to the Admin Panel 👋</h2>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">👤 Total Users <span>{totalUsers}</span></div>
        <div className="card">📦 Total Products <span>{totalProducts}</span></div>
        <div className="card">🛒 Total Orders <span>{totalOrders}</span></div>
        <div className="card">💰 Total Revenue <span>₹{totalRevenue}</span></div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Line Chart */}
        <div className="chart-box">
          <h3>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#FFB6C1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Pie Chart */}
        <div className="chart-box">
          <h3>Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(-5).map((ord) => (
              <tr key={ord.id}>
                <td>{ord.id}</td>
                <td>{ord.username}</td>
                <td>{ord.name}</td>
                <td>₹{ord.price}</td>
                <td>
                  <span className={`status-badge ${ord.status?.toLowerCase()}`}>
                    {ord.status}
                  </span>
                </td>
                <td>{ord.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
