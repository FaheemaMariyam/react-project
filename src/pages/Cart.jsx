import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./cart.css";
import { OrderContext } from "../context/OrderContext";
import Navbar from '../components/Navbar';
import { AuthContext } from "../context/AuthContext";
function Cart() {
  const { cart, removeCart,increaseQuantity,decreaseQuantity } = useContext(CartContext);
  const totalPrice=cart.reduce((total,item)=>total+(Number(item.price) || 0) * (item.quantity || 0),0)
  const{addOrder}=useContext(OrderContext);
  const buyNow=(id)=>{
    const product=cart.find(item=>item.id===id);
    addOrder(product);
    removeCart(id)
    alert(`${product.name} ordered successfully`)
  }
  
    return (
    <div className="cart-page">
      <Navbar/>
      <h2 className="cart-heading">My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cart.map((p) => (
            <div className="cart-card" key={p.id}>
              <img src={p.image} alt={p.name} />
              <h3 className="cart-card-details" >{p.name}</h3>
              <p className="cart-card-details">₹{p.price}</p>

              <div className="quantity-container">
                <button className="quantity-btn"   onClick={()=>increaseQuantity(p.id)}>+</button>
                <h3>{p.quantity}</h3>
                <button className="quantity-btn" onClick={()=>decreaseQuantity(p.id)}>-</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeCart(p.id)}
              >
                Remove
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="remove-btn" onClick={()=> buyNow(p.id)}>Buy now</button>
            </div>
          ))}
        </div>
      )}
      <div className="total-price-box">

        <h3>Total Price</h3>
        <h3>₹{totalPrice}</h3>
      </div>
    </div>
  );
}

export default Cart;
