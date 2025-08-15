import React, { useContext } from 'react'
import { WishlistContext } from '../context/wishlistContext'
import './wishlist.css'
function WishList() {
    const{wishlist,removeWishlist}=useContext(WishlistContext)
  return (
    <div className="wishlist-page">
      <h2 className="wishlist-heading">My Wishlist</h2>

      <div className="wishlist-grid">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
              <button
                className="remove-btn"
                onClick={() => removeWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishList
