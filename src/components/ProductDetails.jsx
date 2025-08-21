import React, { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './ProductDetails.css';
import { WishlistContext } from '../context/wishlistContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';

function ProductDetails() {
  const { state } = useLocation();
  const { product } = state || {};
  
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addCart } = useContext(CartContext);
  const {addOrder}=useContext(OrderContext)
  
  

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
          <button className="cart-btn" onClick={() => addCart(product)}>
            <FaShoppingCart/>
          </button>
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

          {/* <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button> */}
          
          <button className='back-btn' onClick={()=>navigate("/checkout",{state:{product}})}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
