import React, { useContext, useEffect, useState } from "react";
import "./ProductsCard.css";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlistContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductsCard = () => {
  const { wishlist, toggleWishlist, removeWishlist } = useContext(WishlistContext);
  const { addCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data.results.slice(0, 5)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="categories-section">
      <h2 className="section-title">Featured Products</h2>

      <div className="categories-grid">
        {products.map((pro) => {
          // FIXED: Compare directly with pro.id
          // const isInWishlist = wishlist.some((item) => item.id === pro.id);

          return (
            <div className="category-card" key={pro.id}>
              <div className="image-container">
                {/* Navigate to product details */}
                <img
                  src={pro.image}
                  alt={pro.name}
                  onClick={() => navigate("/product-details", { state: { product: pro } })}
                />

                {/* Wishlist button */}
                {/* <button
                  className="wishlist-btn"
                  onClick={() =>
                    isInWishlist ? removeWishlist(pro.id) : toggleWishlist(pro)
                  }
                >
                  <FaHeart color={isInWishlist ? "#d48b6e" : "#dcc4bbff"} />
                </button> */}
              </div>

              <div className="card-info">
                <h3>{pro.name}</h3>
                <p className="price">₹{pro.price}</p>

                {/* <button className="add-to-cart-btn" onClick={() => addCart(pro)}>
                  Add to Cart
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsCard;
