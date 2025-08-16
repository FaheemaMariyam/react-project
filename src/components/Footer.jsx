import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left - Brand */}
        <div className="footer-brand">
          <h3>ShopEase</h3>
          <p>Making your shopping experience easy & enjoyable.</p>
        </div>

        {/* Middle - Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/orders">Orders</NavLink></li>
            <li><NavLink to="/wishlist">Wishlist</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Right - Contact / Social */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@shopease.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
