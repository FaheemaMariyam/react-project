// // import React, { useContext } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { CartContext } from "../context/CartContext";
// // import { OrderContext } from "../context/OrderContext";

// // function OrderConfirm() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { cart, removeCart } = useContext(CartContext);
// //   const { addOrder} = useContext(OrderContext);

// //   // safely access details
// //   const details = location.state?.details || {};

// //   // COD Handler
// //   const handleCOD = () => {
// //     addOrder(cart); 
// //     removeCart(); 
// //     alert("Order placed with Cash on Delivery!");
// //     navigate("/orders");
// //   };

// //   const handleOnline = () => {
// //     navigate("/payment", { state: { details, cart } });
// //   };

// //   return (
// //     <div className="order-confirm-page">
// //       <h2>Order Confirmation</h2>

// //       <div className="confirm-details">
// //         <h3>Shipping Details</h3>
// //         <p><strong>Name:</strong> {details.name || "N/A"}</p>
// //         <p><strong>Address:</strong> {details.address || "N/A"}</p>
// //         <p><strong>Phone:</strong> {details.phone || "N/A"}</p>
// //       </div>

// //       <div className="confirm-items">
// //         <h3>Items in Cart</h3>
// //         {cart.map((item) => (
// //           <div key={item.id} className="confirm-item">
// //             <p>{item.name} - ₹{item.price} × {item.quantity}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="payment-method">
// //         <h3>Choose Payment Option</h3>
// //         <button className="cod-btn" onClick={handleCOD}>
// //           Cash on Delivery
// //         </button>
// //         <button className="online-btn" onClick={handleOnline}>
// //           Online Payment
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default OrderConfirm;
// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { OrderContext } from "../context/OrderContext";

// function OrderConfirm() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cart, clearCart, removeCart } = useContext(CartContext);
//   const { addOrder, buyAll } = useContext(OrderContext);

//   const details = location.state?.details || {};
//   const product = location.state?.product; // for single product checkout
//   const isBuyAll = location.state?.cart;   // for buy all checkout

//   // ✅ COD Handler
//   const handleCOD = () => {
//     if (product) {
//       // Single product order
//       addOrder({ ...product, ...details });
//       removeCart(product.id);
//     } else if (cart.length > 0) {
//       // Buy all
//       buyAll(cart.map(item => ({ ...item, ...details })));
//       clearCart();
//     }

//     alert("Order placed with Cash on Delivery!");
//     navigate("/orders");
//   };

//   const handleOnline = () => {
//     if (product) {
//       navigate("/payment", { state: { product, details } });
//     } else {
//       navigate("/payment-all", { state: { cart, details } });
//     }
//   };

//   return (
//     <div className="order-confirm-page">
//       <h2>Order Confirmation</h2>

//       <div className="confirm-details">
//         <h3>Shipping Details</h3>
//         <p><strong>Name:</strong> {details.name || "N/A"}</p>
//         <p><strong>Address:</strong> {details.address || "N/A"}</p>
//         <p><strong>Phone:</strong> {details.phone || "N/A"}</p>
//       </div>

//       <div className="confirm-items">
//         <h3>Items</h3>
//         {(product ? [product] : cart).map((item) => (
//           <div key={item.id} className="confirm-item">
//             <p>{item.name} - ₹{item.price} × {item.quantity}</p>
//           </div>
//         ))}
//       </div>

//       <div className="payment-method">
//         <h3>Choose Payment Option</h3>
//         <button className="cod-btn" onClick={handleCOD}>
//           Cash on Delivery
//         </button>
//         <button className="online-btn" onClick={handleOnline}>
//           Online Payment
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OrderConfirm;

// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { OrderContext } from "../context/OrderContext";
// import Navbar from "./Navbar";
// import "./Checkout.css";
// import { CartContext } from "../context/CartContext";

// function OrderConfirm() {
//   const { addOrder } = useContext(OrderContext);
//   const{removeCart}=useContext(CartContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { product, details } = location.state || {};

//   if (!product || !details) {
//     return <p style={{ textAlign: "center", marginTop: "100px" }}>No order details found</p>;
//   }

//   const cashOnDelivery = () => {
//     addOrder({ ...product, details, payment: "Cash on Delivery" });
//     removeCart(product.id)
//     alert("Order placed successfully!");
//     navigate("/orders");
//   };

//   const onlinePayment = () => {
//     navigate("/payment", { state: { product, details } });
//   };

//   return (
//     <div className="main-container">
//       <Navbar />
//       <div className="checkout-container">
//         <h2 className="checkout-heading">Confirm Your Order</h2>

//         <h3>Product: {product.name}</h3>
//         <p>Price: ₹{product.price}</p>

//         <h4>Delivery Details:</h4>
//         <p>{details.name}</p>
//         <p>{details.address}, {details.city}</p>
//         <p>Pin: {details.pin}</p>
//         <p>Phone: {details.phone}</p>

//         <div className="checkout-actions">
//           <button className="checkout-btn" onClick={cashOnDelivery}>Cash on Delivery</button>
//           <button className="checkout-btn outline" onClick={onlinePayment}>Online Payment</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderConfirm;
// import React, { useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { OrderContext } from "../context/OrderContext";
// import { AuthContext } from "../context/AuthContext";
// import { CartContext } from "../context/CartContext";
// import { toast } from "react-toastify";
// import axiosInstance from "../APIs/axiosInstance";
// import Navbar from "./Navbar";
// import "./Checkout.css";

// function OrderConfirm() {
//   const { addOrder } = useContext(OrderContext);
//   const { removeCart } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Destructure product and details
//   // const { product: p, details } = location.state || {};
//   const { product: p, quantity, details } = location.state || {};


//   if (!p || !details) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "100px" }}>
//         No order details found
//       </p>
//     );
//   }

//   // Use actual product object for cleaner access
//   const actualProduct = p.product || p;


//   console.log("OrderConfirm location.state:", location.state);


// const cashOnDelivery = async () => {
//   try {
//     await addOrder({
//       items: [{ product_id: actualProduct.id, quantity }],
//       shippingDetails: details,
//       payment_method: "COD",
//     });

//     removeCart(p.id);

//     toast.success("Order placed successfully! 🚚");
//     navigate("/orders");
//   } catch (err) {
//     const msg = err.response?.data?.error || "Failed to place order";
//     toast.error(msg); // <-- show stock error
//     console.error(err);
//   }
// };


// const onlinePayment = async () => {
//   const amount = parseFloat(actualProduct.price);
//   if (isNaN(amount) || amount <= 0) {
//     toast.error("Invalid product price. Cannot proceed with payment.");
//     return;
//   }

//   try {
//     // Create order on backend
//     const res = await axiosInstance.post("/orders/razorpay/create-order/", { amount });
//     const { order_id, key_id, amount: rAmount, currency } = res.data;

//     const options = {
//       key: key_id,
//       amount: rAmount,
//       currency: currency,
//       name: "ShopEase",
//       description: actualProduct.name,
//       order_id: order_id,
//       handler: async function (response) {
//         try {
//           await axiosInstance.post("/orders/razorpay/verify-payment/", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             items: [{ product_id: actualProduct.id, quantity }],
//             shippingDetails: details,
//             payment_method: "RAZORPAY",
//           });

//           toast.success("Payment successful! ✅");
//           removeCart(p.id);
//           navigate("/orders");
//         } catch (err) {
//           const msg = err.response?.data?.error || "Payment verification failed!";
//           toast.error(msg);
//           console.error(err);
//         }
//       },
//       prefill: {
//         name: details.name,
//         email: user.email,
//         contact: details.phone,
//       },
//       theme: { color: "#d48b6e" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error("Razorpay error:", err);
//     toast.error("Payment failed, please try again.");
//   }
// };


//   return (
//     <div className="main-container">
//       <Navbar />
//       <div className="checkout-container">
//         <h2 className="checkout-heading">Confirm Your Order</h2>

//         <h3>Product: {actualProduct.name}</h3>
//         <p>Price: ₹{actualProduct.price}</p>

//         <h4>Delivery Details:</h4>
//         <p>{details.name}</p>
//         <p>
//           {details.address}, {details.city}
//         </p>
//         <p>Pin: {details.pin}</p>
//         <p>Phone: {details.phone}</p>

//         <div className="checkout-actions">
//           <button className="checkout-btn" onClick={cashOnDelivery}>
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

// export default OrderConfirm;
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../APIs/axiosInstance";
import Navbar from "./Navbar";
import "./Checkout.css";

function OrderConfirm() {
  const { addOrder } = useContext(OrderContext);
  const { removeCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // Step 2: Destructure product, quantity, and details from location.state
  const { product: p, quantity: q, details } = location.state || {};
  const actualProduct = p?.product || p; // handles cart items or direct product

  // Normalize quantity (Step 2)
  const qty = q || p?.quantity || 1;

  if (!actualProduct || !details) {
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>
        No order details found
      </p>
    );
  }

  console.log("OrderConfirm location.state:", location.state);
  console.log("OrderConfirm quantity:", qty);

  // Step 3: Cash on Delivery
  const cashOnDelivery = async () => {
    try {
      await addOrder({
        items: [{ product_id: actualProduct.id, quantity: qty }],
        shippingDetails: details,
        payment_method: "COD",
      });

      if (p?.id) removeCart(p.id); // remove from cart if exists

      toast.success("Order placed successfully! 🚚");
      navigate("/orders");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to place order";
      toast.error(msg);
      console.error(err);
    }
  };

  // Step 4: Online Payment
  const onlinePayment = async () => {
    const amount = parseFloat(actualProduct.price * qty);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Invalid product price. Cannot proceed with payment.");
      return;
    }

    try {
      // Create Razorpay order on backend
      const res = await axiosInstance.post("/orders/razorpay/create-order/", { amount });
      const { order_id, key_id, amount: rAmount, currency } = res.data;

      const options = {
        key: key_id,
        amount: rAmount,
        currency: currency,
        name: "ShopEase",
        description: actualProduct.name,
        order_id: order_id,
        handler: async function (response) {
          try {
            await axiosInstance.post("/orders/razorpay/verify-payment/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: [{ product_id: actualProduct.id, quantity: qty }],
              shippingDetails: details,
              payment_method: "RAZORPAY",
            });

            toast.success("Payment successful! ✅");
            if (p?.id) removeCart(p.id);
            navigate("/orders");
          } catch (err) {
            const msg = err.response?.data?.error || "Payment verification failed!";
            toast.error(msg);
            console.error(err);
          }
        },
        prefill: {
          name: details.name,
          email: user.email,
          contact: details.phone,
        },
        theme: { color: "#d48b6e" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      toast.error("Payment failed, please try again.");
    }
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-heading">Confirm Your Order</h2>

        <h3>Product: {actualProduct.name}</h3>
        <p>Price: ₹{actualProduct.price}</p>

        <h4>Delivery Details:</h4>
        <p>{details.name}</p>
        <p>
          {details.address}, {details.city}
        </p>
        <p>Pin: {details.pin}</p>
        <p>Phone: {details.phone}</p>

        <div className="checkout-actions">
          <button className="checkout-btn" onClick={cashOnDelivery}>
            Cash on Delivery
          </button>
          <button className="checkout-btn outline" onClick={onlinePayment}>
            Online Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
