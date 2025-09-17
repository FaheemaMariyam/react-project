// import React, { useContext } from 'react'
// import { CartContext } from '../context/CartContext'
// import { OrderContext } from '../context/OrderContext';
// import { AuthContext } from '../context/AuthContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// function Payment() {
//     const{removeCart}=useContext(CartContext);
//     const{addOrder}=useContext(OrderContext);
//     const{user}=useContext(AuthContext);
//     const location=useLocation();
//     const navigate=useNavigate();
//     const{product,details}=location.state;
//     const handlePayment=()=>{
//         addOrder({...product,quantity:product.quantity,...details})
//         removeCart(product.id)
//         alert(`payment successfull.You order for ${product.name} is successfull`)
//         navigate("/orders")

//     }
//   return (
//     <div>
//      <Navbar/>
//      <h2>Online Payment</h2>
//      <img src="qrcode.png" alt="QR Code" />
//      <button onClick={handlePayment}>Proceed</button>
//     </div>
//   )
// }

// export default Payment
// Payment.js
// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { OrderContext } from "../context/OrderContext";
// import Navbar from "./Navbar";
// import "./Payment.css";

// function Payment() {
//   const { removeCart } = useContext(CartContext);
//   const { buyAll } = useContext(OrderContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { cart, details } = location.state;

//   const handlePayment = () => {
//     buyAll(cart); // ✅ move cart items to orders
//     removeCart(); // ✅ clear cart
//     alert("Payment successful, your order is confirmed!");
//     navigate("/orders");
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="payment-container">
//         <h2>Online Payment</h2>
//         <p>Scan the QR code below or click Pay to simulate payment</p>
//         <div className="qr-box">
//           <img src="qrcode.png" alt="QR Code" />
//         </div>
//         <button className="proceed-btn" onClick={handlePayment}>
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Payment;
// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { OrderContext } from "../context/OrderContext";
// import Navbar from "./Navbar";
// import "./Payment.css";

// function Payment() {
//   const { removeCart } = useContext(CartContext);
//   const { addOrder } = useContext(OrderContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { product, details } = location.state; // ✅ single product, not full cart

//   const handlePayment = () => {
    
//     addOrder({...product, details,payment:"Online Payment"}); // ✅ add single product order
//    removeCart(product.id) // ✅ clear cart if product was from cart
//     alert("Payment successful, your order is confirmed!");
//     navigate("/orders");
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="payment-container">
//         <h2>Online Payment</h2>
//         <p>Scan the QR code below or click Pay to simulate payment</p>
//         <div className="qr-box">
//           <img src="qrcode.png" alt="QR Code" />
//         </div>
//         <button className="proceed-btn" onClick={handlePayment}>
//           Pay
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Payment;
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import Navbar from "./Navbar";
import "./Payment.css";
import { toast } from "react-toastify"; // ✅ import toast

function Payment() {
  const { removeCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { product, details } = location.state; // ✅ single product, not full cart

  const handlePayment = () => {
    addOrder({ ...product, details, payment: "Online Payment" }); // ✅ add single product order
    removeCart(product.id); // ✅ clear cart if product was from cart

    // ✅ Show success toast instead of alert
    toast.success("Payment successful! Your order is confirmed 🎉", {
      position: "top-center",
      autoClose: 3000,
    });

    navigate("/orders");
  };

  return (
    <div>
      <Navbar />
      <div className="payment-container">
        <h2>Online Payment</h2>
        <p>Scan the QR code below or click Pay to simulate payment</p>
        <div className="qr-box">
          <img src="qrcode.png" alt="QR Code" />
        </div>
        <button className="proceed-btn" onClick={handlePayment}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default Payment;
