
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`orders_${savedUser.id}`)) || [];
    }
    return [];
  });
  const navigate=useNavigate();
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
      setOrders(savedOrders);
    } else {
      setOrders([]); 
    }
  }, []);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
          if(user){
              localStorage.setItem(`orders_${user.id}`,JSON.stringify(orders))
          }
      },[orders])

 
  const addOrder = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      navigate("/login")
      return;
    }

    const ordersKey = `orders_${user.id}`;
    const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

    const newOrder = {
      ...product,
      quantity: product.quantity || 1,
      
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
