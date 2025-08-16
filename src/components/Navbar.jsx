// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css"; // custom styles

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
//       <div className="container">
//         <NavLink className="navbar-brand fw-bold" to="/">
//           MyShop
//         </NavLink>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/products">Products</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/cart">Cart</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/signup">SignUp</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/login">Login</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/profile">Profile</NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/" onClick={window.location.reload}>
          ShopEase
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

    <div className="collapse navbar-collapse" id="navbarNav">
  {/* Center-right Nav links */}
  <ul className="navbar-nav ms-auto me-3">
    <li className="nav-item">
      <NavLink className="nav-link" to="/">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/products">Products</NavLink>
    </li>
     <li className="nav-item">
      <NavLink className="nav-link" to="/orders">Orders</NavLink>
    </li>
  </ul>
 

  {/* Right side icons and auth links */}
  <ul className="navbar-nav align-items-center">
    <li className="nav-item">
      <NavLink className="nav-link" to="/wishlist">
        <FaHeart />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/cart">
        <FaShoppingCart />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/logout">
        <FaSignOutAlt />
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/signup">SignUp</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/login">Login</NavLink>
    </li>
  </ul>
</div>


      </div>
    </nav>
  );
}

export default Navbar;
