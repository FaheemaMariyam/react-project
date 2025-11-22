
// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { addOrderToDB, getUserOrders } from "../APIs/OrderApi";
// import { updateOrderStatus } from "../APIs/OrderApi";
// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orders, setOrders] = useState(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) {
//       return JSON.parse(localStorage.getItem(`orders_${savedUser.id}`)) || [];
//     }
//     return [];
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
      
//       getUserOrders(user.id,user.username).then((res) => {
//         setOrders(res.data);
//         localStorage.setItem(`orders_${user.id}`, JSON.stringify(res.data));
//       });
//     } else {
//       setOrders([]);
//     }
//   }, []);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       localStorage.setItem(`orders_${user.id}`, JSON.stringify(orders));
//     }
//   }, [orders]);

  
// const addOrder = async (product) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) {
//     alert("Please login first");
//     navigate("/login");
//     return;
//   }

//   const newOrder = {
//     id: Date.now(), 
//     userId: user.id,
//     ...product,
//     username:user.username,
//     quantity: product.quantity || 1,
//     status: "Pending",
//     date: new Date().toLocaleDateString(),
//   };

  
//   const res = await addOrderToDB(newOrder);

//   setOrders((prev) => [...prev, res.data]);
// };

   
// const cancelOrder = async (orderId) => {
//   try {
//     await updateOrderStatus(orderId, "Cancelled");

//     const user = JSON.parse(localStorage.getItem("user"));

//     setOrders((prev) => {
//       const updatedOrders = prev.map(o =>
//         o.id === orderId ? { ...o, status: "Cancelled" } : o
//       );

//       if (user) {
//         localStorage.setItem(`orders_${user.id}`, JSON.stringify(updatedOrders));
//       }

//       return updatedOrders;
//     });
//   } catch (err) {
//     console.error("Error cancelling order:", err);
//   }
// };


// const buyAll = async (cartItems) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) {
//     alert("Please login first");
//     navigate("/login");
//     return;
//   }

//   const newOrders = cartItems.map((item,index) => ({
//     id: `${Date.now()}-${index}`, 
//     userId: user.id,
//     ...item,
//     username:user.username,
//     quantity: item.quantity || 1,
//     status: "Pending",
//     date: new Date().toLocaleDateString(),
//   }));

//   const savedOrders = await Promise.all(
//     newOrders.map((order) => addOrderToDB(order))
//   );

//   setOrders((prev) => [...prev, ...savedOrders.map((o) => o.data)]);
// };

//   return (
//     <OrderContext.Provider value={{ orders, addOrder, buyAll,cancelOrder }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUserOrders, addOrderToDB, updateOrderStatus } from "../APIs/OrderApi";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  // Normalize each order to ensure product data exists
  const normalizeOrders = (orderList) => {
    return orderList.map((ord) => ({
      ...ord,
      items: ord.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: Number(item.price),
        product: {
          id: item.product?.id || item.product_id,
          name: item.product?.name || item.product_name,
          image: item.product?.image || item.product_image,
          price: item.product?.price || item.price,
        },
      })),
    }));
  };

  // Fetch orders
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        setOrders(normalizeOrders(res.data));
      } catch (err) {
        console.log("Order fetch error:", err);
      }
    };

    fetchOrders();
  }, [user]);

  // Add single order (Buy Now)
  const addOrder = async ({ items, shippingDetails, payment_method }) => {
  try {
    // Backend expects shipping fields at top level, not nested
    const payload = {
      items,
      name: shippingDetails.name,
      address: shippingDetails.address,
      city: shippingDetails.city,
      pin: shippingDetails.pin,
      phone: shippingDetails.phone,
      payment_method,
    };

    const res = await addOrderToDB(payload);

    const updated = await getUserOrders();
    setOrders(normalizeOrders(updated.data));

    return res.data;
  } catch (err) {
    console.error("Add Order error:", err);
    throw err;
  }
};

  

  // Buy All Order (Bulk)
  const buyAll = async (cartItems, shippingDetails, payment_method) => {
  try {
    const items = cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const payload = {
      items,
      name: shippingDetails.name,
      address: shippingDetails.address,
      city: shippingDetails.city,
      pin: shippingDetails.pin,
      phone: shippingDetails.phone,
      payment_method,
    };

    const res = await addOrderToDB(payload);

    const updated = await getUserOrders();
    setOrders(normalizeOrders(updated.data));

    return res.data;
  } catch (err) {
    console.error("Buy All error:", err);
    throw err;
  }
};



  // Cancel order
  const cancelOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "Cancelled");

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, buyAll, cancelOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
