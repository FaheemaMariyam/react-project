

// import React, { useContext } from "react";
// import { OrderContext} from "../context/OrderContext";
// import "./order.css";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Order() {
//   const { orders,cancelOrder } = useContext(OrderContext);
//   const { user } = useContext(AuthContext);
  
// if(!user || user.role==="admin") {return <p>Cannot access this page</p>
          
//         } 
  

//   return (
//     <div className="order-page">
//       <Navbar />
//       <h3 className="order-heading">My orders</h3>
//       <div className="order-grid">
//         {orders.map((ord, index) => (
//           <div className="order-card" key={`${ord.id}-${index}`}>
//             <img src={ord.image} alt={ord.name} />
//             <h3 className="order-details-head">{ord.name}</h3>
//             <p className="order-details-text">₹{ord.price}</p>
//             <p className="order-details-text">Quantity: {ord.quantity}</p>
            
//             <p className="order-details-text">Status: {ord.status || "Pending"}</p>
//   <p className="order-details-text">Ordered on: {ord.date || "NA"}</p>
//     {["Pending","shipped","processing"].includes
//     (ord.status)&& (
//     <button
//       className="cancel-btn"
//       onClick={() => cancelOrder(ord.id)}
//     >
//       Cancel Order
//     </button>
//   )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Order;
// import React, { useContext } from "react";
// import { OrderContext } from "../context/OrderContext";
// import "./order.css";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// function Order() {
//   const { orders, cancelOrder } = useContext(OrderContext);
//   const { user } = useContext(AuthContext);

//   if (!user || user.role === "admin") {
//     return <p>Cannot access this page</p>;
//   }

//   const handleCancel = (id) => {
//     cancelOrder(id);
//     toast.success("Your order has been canceled!");
//   };

//   return (
//     <div className="order-page">
//       <Navbar />
//       <h3 className="order-heading">My Orders</h3>

//       <div className="order-grid">
//         {orders.map((ord, index) => (
//           <div className="order-card" key={`${ord.id}-${index}`}>
//             <img src={ord.image} alt={ord.name} />
//             <h3 className="order-details-head">{ord.name}</h3>
//             <p className="order-details-text">₹{ord.price}</p>
//             <p className="order-details-text">Quantity: {ord.quantity}</p>
//             <p className="order-details-text">
//               Status: {ord.status || "Pending"}
//             </p>
//             <p className="order-details-text">
//               Ordered on: {ord.date || "NA"}
//             </p>

//             {["Pending", "shipped", "processing"].includes(ord.status) && (
//               <button className="cancel-btn" onClick={() => handleCancel(ord.id)}>
//                 Cancel Order
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Order;
import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import "./order.css";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Order() {
  const { orders, cancelOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Wait until orders are fetched
  useEffect(() => {
    if (user) {
      setLoading(false); // Assuming orders are already loaded from context
    }
  }, [user, orders]);

  if (!user || user.role === "admin") {
    return <p>Cannot access this page</p>;
  }

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading your orders...</p>;
  }

  if (!orders || orders.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>You have no orders yet.</p>;
  }

  const handleCancel = (id) => {
    cancelOrder(id);
    toast.success("Your order has been canceled!");
  };

  return (
    <div className="order-page">
      <Navbar />
      <h3 className="order-heading">My Orders</h3>

      <div className="order-grid">
        {orders.map((ord, index) => (
          <div className="order-card" key={`${ord.id}-${index}`}>
            <img src={ord.image} alt={ord.name} />
            <h3 className="order-details-head">{ord.name}</h3>
            <p className="order-details-text">₹{ord.price}</p>
            <p className="order-details-text">Quantity: {ord.quantity}</p>
            <p className="order-details-text">Status: {ord.status || "Pending"}</p>
            <p className="order-details-text">Ordered on: {ord.date || "NA"}</p>

            {["Pending", "shipped", "processing"].includes(ord.status) && (
              <button className="cancel-btn" onClick={() => handleCancel(ord.id)}>
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
