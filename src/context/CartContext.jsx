
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  
  const [cart, setCart] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      return JSON.parse(localStorage.getItem(`cart_${savedUser.id}`)) || [];
    }
    return [];
  });
  const navigate=useNavigate();


  useEffect(() => {
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]); 
    }
  }, [user]);

  
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [user, cart]);

  
  const addCart = (product) => {
    if(!user){
      alert ("please login first to add items to cart");
      navigate("/login")
      return;
      
    }
    if (!cart.some((item) => item.id === product.id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
  };

  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

