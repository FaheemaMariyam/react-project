import React, { useEffect, useState } from "react";
import axiosInstance from "../../APIs/axiosInstance";
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [revenueData, setRevenueData] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance
      .get("/admin/dashboard/")
      .then((res) => {
        const d = res.data;

        // Map DRF keys → State
        setTotalUsers(d.total_users ?? 0);
        setTotalProducts(d.total_products ?? 0);
        setTotalOrders(d.total_orders ?? 0);
        setTotalRevenue(d.total_revenue ?? 0);

        setRevenueData(d.revenue_trend ?? []);

        setStatusCounts(d.status_counts ?? []);

        setRecentOrders(d.recent_orders ?? []);
      })
      .catch((err) => {
        console.error("Dashboard load error:", err);
        setError("Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }, []);

  const colors = ["#FFB6C1","#e3e55b", "#FFDAB9", "#90EE90", "#87CEFA"];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to the Admin Panel 👋</h2>

      <div className="summary-cards">
        <div className="card">
          👤 Total Users <span>{totalUsers}</span>
        </div>
        <div className="card">
          📦 Total Products <span>{totalProducts}</span>
        </div>
        <div className="card">
          🛒 Total Orders <span>{totalOrders}</span>
        </div>
        <div className="card">
          💰 Total Revenue <span>₹{totalRevenue}</span>
        </div>
      </div>

      <div className="charts-section">
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
  {recentOrders.map((ord) => (
    <tr key={ord.id}>
      <td>{ord.id}</td>
      <td>{ord.user?.name}</td>
      {/* <td>{ord.items?.[0]?.product?.name}</td> */}
      <td>
  {(() => {
    const count = ord.items?.length || 0;
    if (count === 0) return "—";

    const firstName = ord.items[0]?.product?.name || "Unknown";

    return count === 1
      ? firstName
      : `${firstName} & ${count - 1} more`;
  })()}
</td>

      <td>₹{ord.total_price}</td>
      <td>
        <span className={`status-badge ${ord.status?.toLowerCase()}`}>
          {ord.status}
        </span>
      </td>
      <td>{ord.ordered_at}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
