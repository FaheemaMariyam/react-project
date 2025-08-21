import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Products from "./pages/Products";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/wishlistContext";
import { CartProvider } from "./context/CartContext";

import "./App.css";

import { OrderProvider } from "./context/OrderContext";
import ProductDetails from "./components/ProductDetails";
import { Navigate } from "react-router-dom";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import CheCkoutAll from "./components/CheCkoutAll";
import PaymentAll from "./components/PaymentAll";
// import OrderDetails from "./components/OrderDetails";
// import Payment from "./components/Payment";

function App() {
  const { user } = useContext(AuthContext);
   
  
  return (
    <BrowserRouter>
      
      
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <Routes>
                <Route path="/" element={<Home />} />
               
                   
                    <Route path="/signup" element={ !user ? <Signup /> : <Navigate to='/'/> } />
                    <Route path="/login" element={!user ?<Login /> :  <Navigate to='/'/>} />
                 

                <Route path="/products" element={<Products />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/product-details" element={<ProductDetails />} />
                 <Route path="/checkout" element={<Checkout />} />
                 <Route path="/payment" element={<Payment />} />
                  <Route path="/checkout-all" element={<CheCkoutAll />} />
                   <Route path="/payment-all" element={<PaymentAll />} />


                {/* <Route path={`/order-details/:id`} element={<OrderDetails/>}/>
                  <Route path={`/payment/:id`} element={<Payment/>}/> */}
                {/* <Route path="/product-details/:id" element={<ProductDetails />} /> */}

              </Routes>
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      
    </BrowserRouter>
  );
}

export default App;
