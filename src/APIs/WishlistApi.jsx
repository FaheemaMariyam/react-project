import axios from "axios";

const API = "https://dbrender-liu7.onrender.com/wishlist";

// Add item to wishlist
export const addWishlistToDB = (item) => axios.post(API, item);

// Get wishlist items for a user
export const getUserWishlist = (userId) => axios.get(`${API}?userId=${userId}`);

// Remove item from wishlist
export const removeWishlistFromDB = (id) => axios.delete(`${API}/${id}`);

// Clear wishlist for a user
export const clearWishlistFromDB = async (userId) => {
  const res = await axios.get(`${API}?userId=${userId}`);
  await Promise.all(res.data.map((item) => axios.delete(`${API}/${item.id}`)));
};
