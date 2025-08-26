import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderContext } from "../context/OrderContext";
import Navbar from "./Navbar";
import "./Checkout.css";
import { CartContext } from "../context/CartContext";

function OrderConfirmAll() {
  const { buyAll } = useContext(OrderContext);
  const {clearCart}=useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, details } = location.state || {};

  if (!cart || cart.length === 0 || !details) {
    return <p style={{ textAlign: "center", marginTop: "100px" }}>No order details found</p>;
  }

  const cashOnDelivery = () => {
    buyAll(cart, details, "Cash on Delivery");
  clearCart();
    alert("All items ordered successfully!");
    navigate("/orders");
  };

  const onlinePayment = () => {
    navigate("/payment-all", { state: { cart, details } });
  };

  return (
    <div className="main-container">
      <Navbar />
      <div className="checkout-container">
        <h2 className="checkout-heading">Confirm All Orders</h2>

        {cart.map((item) => (
          <div key={item.id}>
            <h3>{item.name} - ₹{item.price} × {item.quantity}</h3>
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
