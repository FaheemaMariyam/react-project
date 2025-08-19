import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './ProductDetails.css';
import { WishlistContext } from '../context/wishlistContext';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

function ProductDetails() {
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addCart } = useContext(CartContext);

  if (!product)
    return (
      <p style={{ textAlign: 'center', marginTop: '100px' }}>
        Product not found
      </p>
    );

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div>
      <Navbar />
      <div className="product-details-container">
        {/* Product Image Section */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          {/* Wishlist Button inside image */}
          <button
            className="wishlist-btn"
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart color={isInWishlist ? '#d48b6e' : '#dcc4bbff'} />
          </button>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          {product.description && <p>{product.description}</p>}

          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="add-cart-btn" onClick={() => addCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
