// import React from "react";
// import "./ProductsCard.css";
// import { FaHeart } from "react-icons/fa";

// const productCard = [
//   { id: 1, name: "Baking Tray", price: 25, image: "/products/baketray.jpg" },
//   { id: 2, name: "Coffee Maker", price: 45, image: "/products/coffee2.jpg" },
//   { id: 3, name: "Indoor Plant", price: 18, image: "/products/plant3.jpg" },
//   { id: 4, name: "Non stick pan", price: 30, image: "/products/panset.jpg" },
//   { id: 5, name: "Dustbin", price: 15, image: "/products/basket2.jpg" }
// ];

// const ProductCard = () => {
//   return (
//     <section className="categories-section">
//       <h2 className="section-title">Featured Products</h2>
//       <div className="categories-grid">
//         {productCard.map((pro) => (
//           <div className="category-card" key={pro.id}>
//             <div className="category-img-container">
//               <img src={pro.image} alt={pro.name} />
//               <button className="wishlist-btn">
//                 <FaHeart />
//               </button>
//             </div>
//             <h3>{pro.name}</h3>
//             <p className="price">${pro.price}</p>
//             <button className="add-to-cart-btn">Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ProductCard;
import React, { useContext, useEffect, useState } from "react";
import "./ProductsCard.css";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../context/wishlistContext";
import { CartContext } from "../context/CartContext";

const ProductsCard = () => {
  const { wishlist, addWishlist } = useContext(WishlistContext);
  const { addCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 5))) // ✅ only first 5 products
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="categories-section">
      <h2 className="section-title">Featured Products</h2>
      <div className="categories-grid">
        {products.map((pro) => {
          const isInWishlist = wishlist.some((item) => item.id === pro.id);
          return (
            <div className="category-card" key={pro.id}>
              <div className="image-container">
                <img src={pro.image} alt={pro.name} />
                <button
                  className="wishlist-btn"
                  onClick={() => addWishlist(pro)}
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
