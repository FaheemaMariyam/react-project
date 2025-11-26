// import React, { useContext } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import './ProductDetails.css';
// import { WishlistContext } from '../context/wishlistContext';
// import { FaHeart, FaShoppingCart } from 'react-icons/fa';
// import { CartContext } from '../context/CartContext';
// import { OrderContext } from '../context/OrderContext';

// function ProductDetails() {
//   const { state } = useLocation();
//   const { product } = state || {};

//   const navigate = useNavigate();
//   const { wishlist, toggleWishlist } = useContext(WishlistContext);
//   const { cart, addCart } = useContext(CartContext);
//   const { addOrder } = useContext(OrderContext);

//   if (!product) {
//     return (
//       <p style={{ textAlign: "center", marginTop: "100px" }}>
//         Product not found
//       </p>
//     );
//   }

//   const isInCart = cart.some((item) => item.product.id === product.id);
//   const isInWishlist = wishlist.some((item) => item.product.id === product.id);

//   return (
//     <div>
//       <Navbar />

//       <div className="product-details-container">

//         {/* Product Image Section */}
//         <div className="product-image">
//           <img src={product.image} alt={product.name} />

//           {/* Cart Button */}
//           <button
//             className="cart-btn"
//             onClick={() => addCart(product)}   // ✔ Always increase quantity
//           >
//             <FaShoppingCart color={isInCart ? "#d48b6e" : "#dcc4bbff"} />
//           </button>

//           {/* Wishlist Button */}
//           <button
//             className="wishlist-btn"
//             onClick={() => toggleWishlist(product)}
//           >
//             <FaHeart color={isInWishlist ? "#d48b6e" : "#dcc4bbff"} />
//           </button>
//         </div>

//         {/* Product Details Section */}
//         <div className="product-info">
//           <h2>{product.name}</h2>
//           <p>Price: ₹{product.price}</p>

//           {product.description && <p>{product.description}</p>}

//           <button
//             className="back-btn"
//             onClick={() =>
//               navigate("/checkout", { state: { product } })
//             }
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './ProductDetails.css';
import { WishlistContext } from '../context/wishlistContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import { toast } from 'react-toastify';
import axiosInstance from '../APIs/axiosInstance';

function ProductDetails() {
  const { state } = useLocation();
  const { product } = state || {};
  const navigate = useNavigate();

  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { cart, addCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { user } = useContext(OrderContext); // for email

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>
        Product not found
      </p>
    );
  }

  const isInCart = cart.some((item) => item.product.id === product.id);
  const isInWishlist = wishlist.some((item) => item.product.id === product.id);

  //  Stock validation
  const validateStock = (quantity) => {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} left for ${product.name}`);
      return false;
    }
    return true;
  };

//  const handleBuyNow = () => {
//   const quantity = 1;

//   if (!validateStock(quantity)) return;

//   // Use actual user details
//   const details = {
//     name: user?.name || "John Doe",
//     email: user?.email || "",
//     phone: user?.phone || "9999999999",
//     address: user?.address || "Some Street",
//     city: user?.city || "City",
//     pin: user?.pin || "123456",
//   };

//   // Pass cartId as null because this is not from cart
//   const payload = {
//     product: { ...product },
//     quantity,
//     details,
//     cartId: null
//   };

//   // ✅ Navigate to checkout
//   navigate("/checkout", { state: payload });
// };
const handleBuyNow = () => {
  const quantity = 1; // default quantity

  // ✅ Check stock before proceeding
  if (product.stock < 1) {
    toast.error(`${product.name} is out of stock`);
    return; // stop navigation
  }

  // Use actual user details
  const details = {
    name: user?.name || "John Doe",
    email: user?.email || "",
    phone: user?.phone || "9999999999",
    address: user?.address || "Some Street",
    city: user?.city || "City",
    pin: user?.pin || "123456",
  };

  // Pass product, quantity, and details in location.state
  navigate("/checkout", {
    state: {
      product: { ...product },
      quantity,
      details,
      cartId: null // optional
    },
  });
};



  return (
    <div>
      <Navbar />

      <div className="product-details-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <button
            className="cart-btn"
            onClick={() => addCart(product)}
          >
            <FaShoppingCart color={isInCart ? "#d48b6e" : "#dcc4bbff"} />
          </button>

          <button
            className="wishlist-btn"
            onClick={() => toggleWishlist(product)}
          >
            <FaHeart color={isInWishlist ? "#d48b6e" : "#dcc4bbff"} />
          </button>
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          {product.description && <p>{product.description}</p>}

          {/* ✅ Buy Now */}
          <button
            className="back-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
