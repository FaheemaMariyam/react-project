import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Navbar.css";
import { WishlistContext } from "../context/wishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { wishlist } = useContext(WishlistContext);
  const { cart } = useContext(CartContext);
  const { login ,user} = useContext(AuthContext);
  console.log(user)
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
     
      <div className="container">
        <NavLink
          className="navbar-brand fw-bold "
          to="/"
          onClick={window.location.reload}
        >
          ShopEase
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto me-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                Orders
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">
                <FaHeart />
                {wishlist.length > 0 && (
                  <span className="wishlist-badge">{wishlist.length}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </NavLink>
            </li>
             {!user? (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              SignUp
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              <FaUser />
            </NavLink>
          </li>
        </>
      ): null}
          
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                <FaSignOutAlt />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
