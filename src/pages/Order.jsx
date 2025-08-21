import React, { useContext } from 'react'
import { OrderContext } from '../context/OrderContext'
import './order.css'
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
function Order() {
    const{orders}=useContext(OrderContext);

     const {user}=useContext(AuthContext);
        
        if(!user) {return <p>Please login first to countinue</p>
          
        }

  return (
    <div className='order-page'>
      <Navbar/>
      <h3 className='order-heading'>My orders</h3>
      <div className='order-grid'>
     {orders.map((ord,index)=>(
        <div  className='order-card' key={index}>
            <img src={ord.image} alt={ord.name} />
           <h3 className='order-details-head'>{ord.name}</h3>
              <p className='order-details-text'>₹{ord.price}</p>
              <p className='order-details-text'>Quantity: {ord.quantity}</p>
        </div>
       
     ))}
      </div>
    </div>
  )
}

export default Order

