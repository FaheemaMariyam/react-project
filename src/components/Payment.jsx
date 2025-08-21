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
import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { OrderContext } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Payment.css'; // create this file

function Payment() {
    const { removeCart } = useContext(CartContext);
    const { addOrder } = useContext(OrderContext);
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { product, details } = location.state;

    const handlePayment = () => {
        addOrder({ ...product, quantity: product.quantity, ...details });
        removeCart(product.id);
        alert(`Payment successful. Your order for ${product.name} is confirmed.`);
        navigate("/orders");
    };

    return (
        <div>
            <Navbar />
            <div className="payment-container">
                <h2>Online Payment</h2>
                <p>Scan the QR code below to complete your payment</p>
                <div className="qr-box">
                    <img src="qrcode.png" alt="QR Code" />
                </div>
                <button className="proceed-btn" onClick={handlePayment}>
                    Pay
                </button>
            </div>
        </div>
    )
}

export default Payment;
