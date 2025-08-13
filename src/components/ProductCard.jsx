import React from "react";
import "./ProductsCard.css";
import { FaHeart } from "react-icons/fa";

const productCard = [
  { id: 1, name: "Baking Tray", price: 25, image: "/products/baketray.jpg" },
  { id: 2, name: "Coffee Maker", price: 45, image: "/products/coffee2.jpg" },
  { id: 3, name: "Indoor Plant", price: 18, image: "/products/plant3.jpg" },
  { id: 4, name: "Non stick pan", price: 30, image: "/products/panset.jpg" },
  { id: 5, name: "Dustbin", price: 15, image: "/products/basket2.jpg" }
];

const ProductCard = () => {
  return (
    <section className="categories-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="categories-grid">
        {productCard.map((pro) => (
          <div className="category-card" key={pro.id}>
            <div className="category-img-container">
              <img src={pro.image} alt={pro.name} />
              <button className="wishlist-btn">
                <FaHeart />
              </button>
            </div>
            <h3>{pro.name}</h3>
            <p className="price">${pro.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCard;
