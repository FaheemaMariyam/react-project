// import React from 'react'
// import { Link, Outlet } from 'react-router-dom'
// import "./AdminLayout.css"
// function AdminLayout() {
//   return (
//     <div className='admin-layout'>
//       <aside className='sidebar'>
//         <h2>Admin Panel</h2>
//         <p>Welcome Admin</p>
//        <nav>
//         <Link to="/admin">Dashboard</Link>
//         <Link to="/admin/users">User Management</Link>
//         <Link to="/admin/products">Product Management</Link>
//         <Link to="/admin/orders">Order Management</Link>
//         {/* <Link to="/admin"></Link> */}
//         <Link to="/logout">Logout</Link>
//        </nav>
//       </aside>
//       <main className='admin-content'>
//         <Outlet/>
//       </main>
//     </div>
//   )
// }

// export default AdminLayout
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminLayout.css";

function AdminLayout() {
  const location = useLocation();

  const links = [
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/users", label: "User Management", icon: <FaUsers /> },
    { to: "/admin/products", label: "Product Management", icon: <FaBoxOpen /> },
    { to: "/admin/orders", label: "Order Management", icon: <FaShoppingCart /> },
    { to: "/logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <p className="sidebar-subtitle">Welcome, Admin 👋</p>

        <nav>
          {links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className={`sidebar-link ${
                location.pathname === link.to ? "active" : ""
              }`}
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

