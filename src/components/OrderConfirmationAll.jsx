import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import "./Checkout.css";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // if not imported globally
import axiosInstance from "../APIs/axiosInstance";



function OrderConfirmAll() {
  const { buyAll } = useContext(OrderContext);
  const { clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // for email
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, details } = location.state || {};

  if (!cart || cart.length === 0 || !details) {
    return <p>No order details found</p>;
  }

  const cashOnDelivery = async () => {
    try {
      await buyAll(cart, details, "COD");
      clearCart();
      toast.success("All items ordered successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order. Try again.");
    }
  };

  const onlinePayment = async () => {
  try {
    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const res = await axiosInstance.post("orders/razorpay/create-order/", {
      amount: totalAmount,
    });

    const { order_id, key_id, amount, currency } = res.data;

    const options = {
      key: key_id,
      amount,
      currency,
      name: "ShopEase",
      description: "All Cart Items",
      order_id: order_id,
     handler: async function (response) {
  try {
    // Verify payment + create order
    await axiosInstance.post("/orders/razorpay/verify-payment/", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      items: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
      shippingDetails: {
        name: details.name,
        address: details.address,
        city: details.city,
        pin: details.pin,
        phone: details.phone,
      },
    });

    // Clear cart
    clearCart();

    // Redirect
    toast.success("Payment successful!");
    navigate("/orders");

  } catch (err) {
    console.error(err);
    toast.error("Payment verification failed");
  }
}

,
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
    console.error(err);
    toast.error("Payment failed, please try again.");
  }
};


  // const onlinePayment = () => {
  //   navigate("/payment-all", { state: { cart, details } });
  // };

  return (
    <div className="main-container">
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-heading">Confirm All Orders</h2>

        {cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name}  ₹{item.product.price} × {item.quantity}</h3>
          </div>
        ))}

        <h4>Delivery Details:</h4>
        <p>{details.name}</p>
        <p>{details.address}, {details.city}</p>
        <p>Pin: {details.pin}</p>
        <p>Phone: {details.phone}</p>

        <div className="checkout-actions">
          <button className="checkout-btn" onClick={cashOnDelivery}>Cash on Delivery</button>
          <button className="checkout-btn outline" onClick={onlinePayment}>Online Payment</button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmAll;
