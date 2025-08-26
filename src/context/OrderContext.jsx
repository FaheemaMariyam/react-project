
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addOrderToDB, getUserOrders } from "../components/OrderApi";
import { updateOrderStatus } from "../components/OrderApi";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`orders_${savedUser.id}`)) || [];
    }
    return [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      
      getUserOrders(user.id,user.username).then((res) => {
        setOrders(res.data);
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(res.data));
      });
    } else {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
    }
  }, [orders]);

  
const addOrder = async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const newOrder = {
    id: Date.now(), 
    userId: user.id,
    ...product,
    username:user.username,
    quantity: product.quantity || 1,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  };

  
  const res = await addOrderToDB(newOrder);

  setOrders((prev) => [...prev, res.data]);
};

   
const cancelOrder = async (orderId) => {
  try {
    await updateOrderStatus(orderId, "Cancelled");

    const user = JSON.parse(localStorage.getItem("user"));

    setOrders((prev) => {
      const updatedOrders = prev.map(o =>
        o.id === orderId ? { ...o, status: "Cancelled" } : o
      );

      if (user) {
        localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
      }

      return updatedOrders;
    });
  } catch (err) {
    console.error("Error cancelling order:", err);
  }
};


const buyAll = async (cartItems) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  const newOrders = cartItems.map((item,index) => ({
    id: `${Date.now()}-${index}`, 
    userId: user.id,
    ...item,
    username:user.username,
    quantity: item.quantity || 1,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  }));

  const savedOrders = await Promise.all(
    newOrders.map((order) => addOrderToDB(order))
  );

  setOrders((prev) => [...prev, ...savedOrders.map((o) => o.data)]);
};

  return (
    <OrderContext.Provider value={{ orders, addOrder, buyAll,cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

