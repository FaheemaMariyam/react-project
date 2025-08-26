// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// function AdminOrders() {
//     const[orders,setOrders]=useState([]);
//    useEffect(()=>{
//     axios.get(`http://localhost:3000/orders`)
//     .then(res=>setOrders(res.data))
//     .catch(err=>console.error(err))
//    },[])
//   return (
//     <div>
//      {orders.map((ord,index)=>(<div key={`${ord.id}-${index}`}><img src={ord.image} alt={ord.name} />{ord.userId}{ord.username}{ord.name}{ord.price}</div>))}
//     </div>
//   )
// }

// export default AdminOrders
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./AdminOrders.css"; // For styling badges and table

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/orders`)
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "pending":
//         return "status-pending";
//       case "shipped":
//         return "status-shipped";
//       case "delivered":
//         return "status-delivered";
//       case "cancelled":
//         return "status-cancelled";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="admin-orders">
//       <h2>Order Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Amount</th>
//             <th>Items</th>
//             <th>Payment</th>
//             <th>Address</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((ord, index) => (
//             <tr key={`${ord.id}-${index}`}>
//               <td>{index + 1}</td>
//               <td>{ord.id}</td>
//               <td>
//                 {ord.username} ({ord.userId})
//               </td>
//               <td>₹{ord.price}</td>
//               <td>{ord.name} x{ord.quantity || 1}</td>
//               <td>{ord.payment || "CASH"}</td>
//               <td>
//                 {ord.address}, {ord.city} - {ord.pin}
//               </td>
//               <td>
//                 <span className={getStatusClass(ord.status)}>
//                   {ord.status}
//                 </span>
//               </td>
//               <td>{ord.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminOrders;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./AdminOrders.css";

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/orders`)
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const updateStatus = (id, newStatus) => {
//     // update locally
//     setOrders((prev) =>
//       prev.map((ord) =>
//         ord.id === id ? { ...ord, status: newStatus } : ord
//       )
//     );

//     // send update to backend (optional if your backend supports it)
//     axios.patch(`http://localhost:3000/orders/${id}`, { status: newStatus });
//   };

//   return (
//     <div className="admin-orders">
//       <h2 className="heading">Order Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Amount</th>
//             <th>Items</th>
//             <th>Payment</th>
//             <th>Address</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((ord, index) => (
//             <tr key={`${ord.id}-${index}`}>
//               <td>{index + 1}</td>
//               <td>{ord.id}</td>
//               <td>
//                 {ord.username} ({ord.userId})
//               </td>
//               <td>₹{ord.price}</td>
//               <td className="product-cell">
//                 {ord.image && (
//                   <img
//                     src={ord.image}
//                     alt={ord.name}
//                     className="product-thumb"
//                   />
//                 )}
//                 {ord.name} x{ord.quantity || 1}
//               </td>
//               <td>{ord.payment || "CASH"}</td>
//               <td >{ord.status}</td>
//               <td>
//                 {ord?.details?.address}, {ord?.details?.city} - {ord?.details?.pin}
//               </td>
//               <td>
//                 <select
//                   value={ord.status}
//                   onChange={(e) => updateStatus(ord.id, e.target.value)}
//                   className={`status-btn ${ord.status}`}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </td>
//               <td>{ord.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminOrders;
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "./AdminOrders.css";

// function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/orders`)
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const updateStatus = (id, newStatus) => {
//     // update locally
//     setOrders((prev) =>
//       prev.map((ord) =>
//         ord.id === id ? { ...ord, status: newStatus } : ord
//       )
//     );

//     // send update to backend
//     axios.patch(`http://localhost:3000/orders/${id}`, { status: newStatus });
//   };

//   // filter logic
//   const filteredOrders =
//     filter === "all"
//       ? orders
//       : orders.filter((ord) => ord.status?.toLowerCase() === filter);

//   return (
//     <div className="admin-orders">
//       <h2 className="heading">Order Management</h2>

//       {/* Tabs */}
//       <div className="tabs">
//         {["all", "pending", "shipped", "delivered", "cancelled"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`tab-btn ${filter === tab ? "active" : ""}`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <table>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Amount</th>
//             <th>Items</th>
//             <th>Payment</th>
//             <th>Address</th>
//             <th>Status</th>
            
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredOrders.map((ord, index) => (
//             <tr key={`${ord.id}-${index}`}>
//               <td>{index + 1}</td>
//               <td>{ord.id}</td>
//               <td>
//                 {ord.username} ({ord.userId})
//               </td>
//               <td>₹{ord.price}</td>
//               <td className="product-cell">
//                 {ord.image && (
//                   <img
//                     src={ord.image}
//                     alt={ord.name}
//                     className="product-thumb"
//                   />
//                 )}
//                 {ord.name} x{ord.quantity || 1}
//               </td>
//               <td>{ord.payment || "CASH"}</td>
//               <td>
//                 {ord?.details?.address}, {ord?.details?.city} -{" "}
//                 {ord?.details?.pin}
//               </td>
             
//               <td>
//                 <select
//                   value={ord.status}
//                   onChange={(e) => updateStatus(ord.id, e.target.value)}
//                   className={`status-btn ${ord.status?.toLowerCase()}`}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </td>
//               <td>{ord.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminOrders;
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminOrders.css";
import { Eye } from "lucide-react"; 
// 👁️ Eye icon


function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === id ? { ...ord, status: newStatus } : ord
      )
    );
    axios.patch(`http://localhost:3000/orders/${id}`, { status: newStatus });
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((ord) => ord.status?.toLowerCase() === filter);

  return (
    <div className="admin-orders">
      <h2 className="heading">Order Management</h2>

      {/* Tabs */}
      <div className="tabs">
        {["all", "pending", "shipped", "delivered", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`tab-btn ${filter === tab ? "active" : ""}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
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
              <td>{ord.id}</td>
              <td>
                {ord.username} ({ord.userId})
              </td>
              <td>
                {ord.name} x{ord.quantity}
              </td>
              <td>₹{ord.price}</td>
              <td>{ord.payment || "CASH"}</td>
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
              <td>{ord.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
     {/* Popup Modal */}
{/* Popup Modal */}
{/* Popup Modal */}
{selectedOrder && (
  <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
    <div
      className="modal-content wide"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close X button */}
      <button className="close-x" onClick={() => setSelectedOrder(null)}>✖</button>

      <h3 className="modal-title">Order Details</h3>

      <div className="modal-body">
        {/* Left: Product Image */}
        <div className="modal-img">
          <img
            src={selectedOrder.image}
            alt={selectedOrder.name}
          />
        </div>

        {/* Right: Info */}
        <div className="modal-info">
          <div className="info-section">
            <h4>Order Info</h4>
            <p><span>Order ID:</span> {selectedOrder.id}</p>
            <p><span>User:</span> {selectedOrder.username} ({selectedOrder.userId})</p>
            <p><span>Product:</span> {selectedOrder.name} x{selectedOrder.quantity}</p>
            <p><span>Price:</span> ₹{selectedOrder.price}</p>
            <p><span>Payment:</span> {selectedOrder.payment}</p>
            <p><span>Status:</span> {selectedOrder.status}</p>
            <p><span>Date:</span> {selectedOrder.date}</p>
          </div>

          <div className="info-section">
            <h4>Customer Info</h4>
            <p><span>Name:</span> {selectedOrder.details?.name}</p>
            <p><span>Address:</span> {selectedOrder.details?.address}</p>
            <p><span>City:</span> {selectedOrder.details?.city}</p>
            <p><span>PIN:</span> {selectedOrder.details?.pin}</p>
            <p><span>Phone:</span> {selectedOrder.details?.phone}</p>
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
