import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./AdminLayout.css"
function AdminLayout() {
  return (
    <div className='admin-layout'>
      <aside className='sidebar'>
        <h2>Admin Panel</h2>
        <p>Welcome Admin</p>
       <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/users">User Management</Link>
        <Link to="/admin/products">Product Management</Link>
        <Link to="/admin/orders">Order Management</Link>
        {/* <Link to="/admin"></Link> */}
        <Link to="/logout">Logout</Link>
       </nav>
      </aside>
      <main className='admin-content'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout
