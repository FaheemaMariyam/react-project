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

  useEffect(() => {
    fetch("https://dbrender-liu7.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 5)))
      .catch((err) => console.log(err));
  }, []);
  const navigate=useNavigate();

  return (
    <section className="categories-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="categories-grid">
        {products.map((pro) => {
          const isInWishlist = wishlist.some((item) => item.id === pro.id);
          return (
            <div className="category-card" key={pro.id}>
              <div className="image-container" >
                <img src={pro.image} alt={pro.name} onClick={()=>navigate('/product-details',{state:{product:pro}})} />
                <button
                  className="wishlist-btn"
                  onClick={() =>
                    isInWishlist ? removeWishlist(pro.id) : toggleWishlist(pro)
                  }
                >
                  <FaHeart color={isInWishlist ? "#d48b6e" : "#dcc4bbff"} />
                </button>
              </div>
              <div className="card-info">
                <h3>{pro.name}</h3>
                <p className="price">₹{pro.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addCart(pro)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsCard;
