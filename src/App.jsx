import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Products from "./pages/Products";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Logout from "./pages/Logout";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/wishlistContext";
import { CartProvider } from "./context/CartContext";

import './App.css'
// import Hero from "./components/Hero";
import { OrderProvider } from "./context/OrderContext";


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <OrderProvider>
    
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Order/>}/>
        <Route path="/wishlist" element={<WishList />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/logout" element={<Logout/>}/>
      </Routes>
    
    </OrderProvider>
    </CartProvider>
    </WishlistProvider>
    </AuthProvider>
    </BrowserRouter>
  );
}



export default App;