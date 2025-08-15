import React, { useContext } from 'react'
import { OrderContext } from '../context/OrderContext'

function Order() {
    const{orders}=useContext(OrderContext);

  return (
    <div>
      <h3>My orders</h3>
     {orders.map((ord,index)=>(
        <div>
            <img src={ord.image} alt={ord.name} />
           <h3>{ord.name}</h3>
              <p>₹{ord.price}</p>
              <p>Quantity: {ord.quantity}</p>
        </div>
     ))}
    </div>
  )
}

export default Order

