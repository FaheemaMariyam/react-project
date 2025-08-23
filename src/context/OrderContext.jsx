
// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orders, setOrders] = useState(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
//     if (savedUser) {
//       return JSON.parse(localStorage.getItem(`orders_${savedUser.id}`)) || [];
//     }
//     return [];
//   });
//   const navigate=useNavigate();
 
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.id}`)) || [];
//       setOrders(savedOrders);
//     } else {
//       setOrders([]); 
//     }
//   }, []);
//   useEffect(()=>{
//     const user = JSON.parse(localStorage.getItem("user"));
//           if(user){
//               localStorage.setItem(`orders_${user.id}`,JSON.stringify(orders))
//           }
//       },[orders])

 
//   const addOrder = (product) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please login first");
//       navigate("/login")
//       return;
//     }
    
//     const ordersKey = `orders_${user.id}`;
//     const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

//     const newOrder = {
//       ...product,
//       quantity: product.quantity || 1,
      
//     };

//     const updatedOrders = [...existingOrders, newOrder];
//     localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
//     setOrders(updatedOrders);
//   };
//   const buyAll=(cartItems)=>{
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("Please login first");
//       navigate("/login")
//       return;
//     }
    
//     const ordersKey = `orders_${user.id}`;
//     const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];

//     // const newOrder = {
//     //   ...cartItems,
//     //   quantity: product.quantity || 1,
      
//     // };
//     const newOrders = cartItems.map(item => ({
//     ...item,
//     quantity: item.quantity || 1,
//   }));

//     const updatedOrders = [...existingOrders, ...newOrders];
//     localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
//     setOrders(updatedOrders);
//   };
  
//   return (
//     <OrderContext.Provider value={{ orders, addOrder,buyAll }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addOrderToDB, getUserOrders } from "../components/OrderApi";

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
      // Fetch from db.json
      getUserOrders(user.id).then((res) => {
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

  // ✅ Single product order
  const addOrder = async (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const newOrder = {
      userId: user.id,
      ...product,
      quantity: product.quantity || 1,
    };

    // Save to db.json
    const res = await addOrderToDB(newOrder);

    setOrders((prev) => [...prev, res.data]);
  };

  // ✅ Buy all cart items at once
  const buyAll = async (cartItems) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const newOrders = cartItems.map((item) => ({
      userId: user.id,
      ...item,
      quantity: item.quantity || 1,
    }));

    // Save all items to db.json
    const savedOrders = await Promise.all(
      newOrders.map((order) => addOrderToDB(order))
    );

    setOrders((prev) => [...prev, ...savedOrders.map((o) => o.data)]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, buyAll }}>
      {children}
    </OrderContext.Provider>
  );
};

