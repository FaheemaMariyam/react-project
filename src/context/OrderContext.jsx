// import React, { createContext, useEffect, useState } from "react";
// export const OrderContext=createContext();
// export const OrderProvider=({children})=>{
//     const[orders,setOrders]=useState(()=>{
//         return JSON.parse(localStorage.getItem("orders"))||[]
        
//     })
//     useEffect(()=>{
//         localStorage.setItem("orders",JSON.stringify(orders))
//     },[orders])
//     const addOrder=(product)=>{
//         setOrders([...orders,product])
//     }
//     return(
//         <OrderContext.Provider value={{orders,addOrder}}>
//             {children}
//         </OrderContext.Provider>
//     )
// }
import React, { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage for the current user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
      setOrders(savedOrders);
    }
  }, []);

  // Add a new order
  const addOrder = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      return;
    }

    const ordersKey = `orders_${user.id}`;
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

    const newOrder = {
      ...product,
      quantity: product.quantity || 1,
      date: new Date().toISOString()
    };

    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
