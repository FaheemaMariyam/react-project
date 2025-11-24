

// import React, { useContext, useState } from 'react'
// import { CartContext } from '../context/CartContext'
// import { OrderContext } from '../context/OrderContext';
// import { AuthContext } from '../context/AuthContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// function Checkout() {
//     const{cart,removeCart}=useContext(CartContext);
//     const{addOrder}=useContext(OrderContext);
//     const{user}=useContext(AuthContext);
//     const location=useLocation();
//     const navigate=useNavigate();
//     const product=location.state?.product;
//     const[details,setDetails]=useState({
//         name:user?.name || "",
//         address:"",
//         city:"",
//         pin:"",
//         phone:""
//     })
//     const placeOrder=()=>{
//         addOrder({...product,quantity:product.quantity,...details});
//         removeCart(product.id);
//         alert(`${product.name} ordered successfully`);
//         navigate("/orders")
//     }
//     const onlinePayment=()=>{
//         navigate("/payment",{state:{product,details}})
//     }
//   return (
//     <div>
//       <Navbar/>
//       <h2>Checkout</h2>
//       <div>
//       <label >Name</label>
//       <input type="text" value={details.name} onChange={(e)=>setDetails({...details,name:e.target.value})}/>
//        <label >Address</label>
//       <input type="text" value={details.address} onChange={(e)=>setDetails({...details,address:e.target.value})}/>
//        <label >City</label>
//       <input type="text" value={details.city} onChange={(e)=>setDetails({...details,city:e.target.value})}/>
//        <label >Pin</label>
//       <input type="text" value={details.pin} onChange={(e)=>setDetails({...details,pin:e.target.value})}/>
//        <label >Phone</label>
//       <input type="text" value={details.phone} onChange={(e)=>setDetails({...details,phone:e.target.value})}/>
//       </div>
//       <button onClick={placeOrder}>cash on delivery</button>
//       <button onClick={onlinePayment}>online payment</button>
//     </div>
//   )
// }

// export default Checkout
// import React, { useContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import { OrderContext } from '../context/OrderContext';
// import { AuthContext } from '../context/AuthContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import './Checkout.css';

// function Checkout() {
//   const { removeCart } = useContext(CartContext);
//   const { addOrder } = useContext(OrderContext);
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state?.product;

//   const [details, setDetails] = useState({
//     name: user?.name || '',
//     address: '',
//     city: '',
//     pin: '',
//     phone: '',
//   });

//   const placeOrder = () => {
//     addOrder({ ...product, quantity: product.quantity, ...details });
//     removeCart(product.id);
//     alert(`${product.name} ordered successfully`);
//     navigate('/orders');
//   };

//   const onlinePayment = () => {
//     navigate('/payment', { state: { product, details } });
//   };

//   if (!product) {
    // return <p style={{ textAlign: 'center', marginTop: '100px' }}>No product to checkout</p>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="checkout-container">
//         <h2 className="checkout-heading">Checkout</h2>

//         {/* Product Summary */}
//         <div className="checkout-product">
//           <img src={product.image} alt={product.name} />
//           <div>
//             <h3>{product.name}</h3>
//             <p>Price: ₹{product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//           </div>
//         </div>

//         {/* Address Form */}
//         <div className="checkout-form">
//           <label>Name</label>
//           <input
//             type="text"
//             value={details.name}
//             onChange={(e) => setDetails({ ...details, name: e.target.value })}
//           />

//           <label>Address</label>
//           <input
//             type="text"
//             value={details.address}
//             onChange={(e) => setDetails({ ...details, address: e.target.value })}
//           />

//           <label>City</label>
//           <input
//             type="text"
//             value={details.city}
//             onChange={(e) => setDetails({ ...details, city: e.target.value })}
//           />

//           <label>Pin</label>
//           <input
//             type="text"
//             value={details.pin}
//             onChange={(e) => setDetails({ ...details, pin: e.target.value })}
//           />

//           <label>Phone</label>
//           <input
//             type="text"
//             value={details.phone}
//             onChange={(e) => setDetails({ ...details, phone: e.target.value })}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="checkout-actions">
//           <button className="checkout-btn" onClick={placeOrder}>
//             Cash on Delivery
//           </button>
//           <button className="checkout-btn outline" onClick={onlinePayment}>
//             Online Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
// Checkout.js
// import React, { useContext, useState } from 'react'
// import { CartContext } from '../context/CartContext'
// import { OrderContext } from '../context/OrderContext';
// import { AuthContext } from '../context/AuthContext';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import './Checkout.css';   // ✅ Import stylesheet

// function Checkout() {
//     const { cart, removeCart } = useContext(CartContext);
//     const { addOrder } = useContext(OrderContext);
//     const { user } = useContext(AuthContext);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const product = location.state?.product;

//     const [details, setDetails] = useState({
//         name: user?.name || "",
//         address: "",
//         city: "",
//         pin: "",
//         phone: ""
//     });

//     const placeOrder = () => {
//         addOrder({ ...product, quantity: product.quantity, ...details });
//         removeCart(product.id);
//         alert(`${product.name} ordered successfully`);
//         navigate("/orders")
//     };

//     const onlinePayment = () => {
//         navigate("/payment", { state: { product, details } })
//     };
//     if(!product){
//         <p style={{ textAlign: 'center', marginTop: '100px' }}>No product found</p>
//     }
//     return (
//         <div className='main-container'>
//             <Navbar />
//             <div className="checkout-container">
//                 <h2 className="checkout-heading">Checkout</h2>

//                 {/* Form */}
//                 <div className="checkout-form">
//                     <label>Name</label>
//                     <input type="text" value={details.name}
//                         onChange={(e) => setDetails({ ...details, name: e.target.value })} />

//                     <label>Address</label>
//                     <input type="text" value={details.address}
//                         onChange={(e) => setDetails({ ...details, address: e.target.value })} />

//                     <label>City</label>
//                     <input type="text" value={details.city}
//                         onChange={(e) => setDetails({ ...details, city: e.target.value })} />

//                     <label>Pin</label>
//                     <input type="text" value={details.pin}
//                         onChange={(e) => setDetails({ ...details, pin: e.target.value })} />

//                     <label>Phone</label>
//                     <input type="text" value={details.phone}
//                         onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
//                 </div>

//                 {/* Buttons */}
//                 <div className="checkout-actions">
//                     <button className="checkout-btn" onClick={placeOrder}>Cash on Delivery</button>
//                     <button className="checkout-btn outline" onClick={onlinePayment}>Online Payment</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Checkout;
// Checkout.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Checkout() {
//   const [checkoutDetails, setCheckoutDetails] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCheckoutDetails({ ...checkoutDetails, [e.target.name]: e.target.value });
//   };

//   const handleNext = () => {
//     // Send checkout details to confirm page
//     navigate("/order-confirm", { state: { details: checkoutDetails} });
//   };

//   return (
//     <div className="checkout-page">
//       <h2>Checkout</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Full Name"
//         value={checkoutDetails.name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="address"
//         placeholder="Address"
//         value={checkoutDetails.address}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="phone"
//         placeholder="Phone"
//         value={checkoutDetails.phone}
//         onChange={handleChange}
//       />

//       <button onClick={handleNext}>Next</button>
//     </div>
//   );
// }

// export default Checkout;
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const product = location.state?.product;

  const [details, setDetails] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    pin: "",
    phone: ""
  });

  if (!product) {
    return <p style={{ textAlign: "center", marginTop: "100px" }}>No product found</p>;
  }

  const goToConfirm = () => {
    navigate("/order-confirm", { 
  state: { 
    product,
    quantity: product.quantity,   // IMPORTANT
    details 
  } 
});

  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-heading">Checkout</h2>

        <div className="checkout-form">
          <label>Name</label>
          <input
            type="text"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />

          <label>Address</label>
          <input
            type="text"
            value={details.address}
            onChange={(e) => setDetails({ ...details, address: e.target.value })}
          />

          <label>City</label>
          <input
            type="text"
            value={details.city}
            onChange={(e) => setDetails({ ...details, city: e.target.value })}
          />

          <label>Pin</label>
          <input
            type="text"
            value={details.pin}
            onChange={(e) => setDetails({ ...details, pin: e.target.value })}
          />

          <label>Phone</label>
          <input
            type="text"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          />
        </div>

        <div className="checkout-actions">
          <button className="checkout-btn" onClick={goToConfirm}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
