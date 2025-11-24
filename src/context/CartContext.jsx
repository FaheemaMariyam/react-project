
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";
// import { useNavigate } from "react-router-dom";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);

  
//   const [cart, setCart] = useState(() => {
//     const savedUser = JSON.parse(localStorage.getItem("user"));
    
//     if (savedUser) {
//       const savedCart= JSON.parse(localStorage.getItem(`cart_${savedUser.id}`)) || [];
//       return Array.isArray(savedCart) ? savedCart : [];
//     }
//     return [];
//   });
//   const navigate=useNavigate();


//   useEffect(() => {
//     if (user) {
//       const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
//       setCart(Array.isArray(savedCart) ? savedCart : []);
//     } else {
//       setCart([]); 
//     }
//   }, [user]);

  
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
//     }
//   }, [user, cart]);

  
//   const addCart = (product) => {
//     if(!user){
//       alert ("please login first to add items to cart");
//       navigate("/login")
//       return;
      
//     }
//     if(user.role==="admin"){
//       return
//     }
//     if (!cart.some((item) => item.id === product.id)) {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
    
//   };

//   const removeCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };
//   const clearCart=()=>{
//     setCart([])
//   }
//   const increaseQuantity = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id) => {
//     setCart(
//       cart.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addCart, removeCart, increaseQuantity, decreaseQuantity,clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addCartToDB,
  getUserCart,
  removeCartFromDB,
  updateCartItem,
  clearCartFromDB,
} from "../APIs/CartApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart([]);
        setLoading(false);
        return;
      }

      try {
        const res = await getUserCart();
        setCart(res.data);
      } catch (err) {
        console.log("Cart fetch error:", err.response?.data || err);
      }
      setLoading(false);
    };

    fetchCart();
  }, [user]);

  // const addCart = async (product) => {
  //   if (!user) {
  //     alert("Please login first to add items to cart");
  //     navigate("/login");
  //     return;
  //   }
  //   if (user.role === "admin") return;

  //   try {
  //     const res = await addCartToDB(product);
  //     const existing = cart.find((item) => item.id === res.data.id);

  //     if (!existing) setCart((prev) => [...prev, res.data]);
  //     else setCart((prev) =>
  //       prev.map((item) => (item.id === res.data.id ? res.data : item))
  //     );
  //   } catch (err) {
  //     console.log("Add cart error:", err.response?.data || err);
  //   }
  // };
  const addCart = async (product) => {
  if (!user) {
    toast.error("Please login first to add items to cart");
    navigate("/login");
    return;
  }
  if (user.role === "admin") return;

  try {
    const res = await addCartToDB(product);
    const existing = cart.find((item) => item.id === res.data.id);

    if (!existing) setCart((prev) => [...prev, res.data]);
    else setCart((prev) =>
      prev.map((item) => (item.id === res.data.id ? res.data : item))
    );
  } catch (err) {
    const msg = err.response?.data?.error || "Failed to add item";
    toast.error(msg);  // <-- show toast
    console.log("Add cart error:", err.response?.data || err);
  }
};


  const removeCart = async (id) => {
    try {
      await removeCartFromDB(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartFromDB();
      setCart([]);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

//   const increaseQuantity = async (id) => {
//   try {
//     const res = await updateCartItem(id, 1);
//     setCart((prev) => prev.map((i) => (i.id === id ? res.data : i)));
//   } catch (err) {
//     console.log(err.response?.data || err);
//   }
// };
const increaseQuantity = async (id) => {
  try {
    const res = await updateCartItem(id, 1);
    setCart((prev) => prev.map((i) => (i.id === id ? res.data : i)));
  } catch (err) {
    const msg = err.response?.data?.error || "Cannot increase quantity";
    toast.error(msg);  // <-- show toast
    console.log(err.response?.data || err);
  }
};
const decreaseQuantity = async (id) => {
  try {
    const res = await updateCartItem(id, -1);
    setCart((prev) => prev.map((i) => (i.id === id ? res.data : i)));
  } catch (err) {
    console.log(err.response?.data || err);
  }
};

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
