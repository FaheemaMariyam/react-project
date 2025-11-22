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
import Logout from "./pages/LogoutIcon";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/wishlistContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import { OrderProvider } from "./context/OrderContext";
import ProductDetails from "./components/ProductDetails";
import { Navigate } from "react-router-dom";
import Checkout from "./components/Checkout";
// import Payment from "./components/Payment";
import CheCkoutAll from "./components/CheCkoutAll";
// import PaymentAll from "./components/PaymentAll";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminAddProducts from "./pages/Admin/AdminAddProducts";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminEditProducts from "./pages/Admin/AdminEditProducts";
import OrderConfirm from "./components/OrderConfirmation";
import OrderConfirmAll from "./components/OrderConfirmationAll";
import AdminOrders from "./pages/Admin/AdminOrders";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={
                  !user ? (
                    <Signup />
                  ) : user.role === "admin" ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              {/* <Route
                path="/login"
                element={
                  !user ? (
                    <Login />
                  ) : user.role === "admin" ? (
                    <Navigate to="/admin-dashboard" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              /> */}
              <Route
                path="/login"
                element={
                  !user ? (
                    <Login />
                  ) : user.role === "admin" ? (
                    <Navigate to="/admin" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />

              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* <Route path="/payment" element={<Payment />} /> */}
              <Route path="/checkout-all" element={<CheCkoutAll />} />
              {/* <Route path="/payment-all" element={<PaymentAll />} /> */}
              <Route path="/order-confirm" element={<OrderConfirm />} />
              <Route path="/order-confirm-all" element={<OrderConfirmAll />} />

              <Route
                path="/admin"
                element={
                  user && user.role === "admin" ? (
                    <AdminLayout />
                  ) : user ? (
                    <Navigate to="/" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="add-product" element={<AdminAddProducts />} />
                <Route
                  path="edit-products/:id"
                  element={<AdminEditProducts />}
                />
                <Route path="orders" element={<AdminOrders />} />
              </Route>
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;
