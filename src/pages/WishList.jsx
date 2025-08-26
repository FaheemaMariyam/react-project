import React, { useContext } from 'react'
import { WishlistContext } from '../context/wishlistContext'
import './wishlist.css'
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function WishList() {
    const{wishlist,removeWishlist}=useContext(WishlistContext)
    const navigate=useNavigate()
     const {user}=useContext(AuthContext);
        
        if(!user || user.role==="admin") {return <p>Cannot access this page</p>
          
        }
       
  return (
    <div className="wishlist-page">
      <Navbar/>
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
