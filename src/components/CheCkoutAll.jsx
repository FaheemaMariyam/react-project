import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { OrderContext } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Checkout.css';

function CheCkoutAll() {
    const { cart, clearCart } = useContext(CartContext);
        const { buyAll } = useContext(OrderContext);
        const { user } = useContext(AuthContext);
        const location = useLocation();
        const navigate = useNavigate();
        // const product = location.state?.product;
    
        const [details, setDetails] = useState({
            name: user?.name || "",
            address: "",
            city: "",
            pin: "",
            phone: ""
        });
        const placeOrder = () => {
        buyAll(cart,details );
       clearCart()
        alert(`All items ordered successfully`);
        navigate("/orders")
    };
    const onlinePayment = () => {
        navigate("/payment-all", { state: { cart, details } })
    };
    
if(cart.length===0){
        return <p style={{ textAlign: 'center', marginTop: '100px' }}>No product found</p>
    }
    return (
        <div className='main-container'>
            <Navbar />
            <div className="checkout-container">
                <h2 className="checkout-heading">Checkout</h2>

                {/* Form */}
                <div className="checkout-form">
                    <label>Name</label>
                    <input type="text" value={details.name}
                        onChange={(e) => setDetails({ ...details, name: e.target.value })} />

                    <label>Address</label>
                    <input type="text" value={details.address}
                        onChange={(e) => setDetails({ ...details, address: e.target.value })} />

                    <label>City</label>
                    <input type="text" value={details.city}
                        onChange={(e) => setDetails({ ...details, city: e.target.value })} />

                    <label>Pin</label>
                    <input type="text" value={details.pin}
                        onChange={(e) => setDetails({ ...details, pin: e.target.value })} />

                    <label>Phone</label>
                    <input type="text" value={details.phone}
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                </div>

                {/* Buttons */}
                <div className="checkout-actions">
                    <button className="checkout-btn" onClick={placeOrder}>Cash on Delivery</button>
                    <button className="checkout-btn outline" onClick={onlinePayment}>Online Payment</button>
                </div>
            </div>
        </div>)
}

export default CheCkoutAll
