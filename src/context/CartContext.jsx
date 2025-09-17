
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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Load cart from DB on user login
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const res = await getUserCart(user.id);
        setCart(res.data);
      } else {
        setCart([]);
      }
      setLoading(false);
    };
    fetchCart();
  }, [user]);

  // Add item to cart
  const addCart = async (product) => {
    if (!user) {
      alert("Please login first to add items to cart");
      navigate("/login");
      return;
    }
    if (user.role === "admin") return;

    const existing = cart.find((item) => item.id === product.id);
    if (existing) return;

    const newItem = { ...product, quantity: 1, userId: user.id };
    const res = await addCartToDB(newItem);
    setCart((prev) => [...prev, res.data]);
  };

  // Remove from cart
  const removeCart = async (id) => {
    await removeCartFromDB(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = async () => {
    if (user) {
      await clearCartFromDB(user.id);
      setCart([]);
    }
  };

  // Increase quantity
  const increaseQuantity = async (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    const item = updatedCart.find((i) => i.id === id);
    await updateCartItem(id, item);
  };

  // Decrease quantity
  const decreaseQuantity = async (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    const item = updatedCart.find((i) => i.id === id);
    await updateCartItem(id, item);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCart,
        removeCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
