import axiosInstance from "./axiosInstance";  // use your JWT-enabled instance

const API = "/wishlist/";

// Add item to wishlist
export const addWishlistToDB = (product) =>
  axiosInstance.post(API, { product_id: product.id });

// Get wishlist items for the logged-in user
export const getUserWishlist = () => axiosInstance.get(API);

// Remove single wishlist item
export const removeWishlistFromDB = (id) => axiosInstance.delete(`${API}${id}/`);

// Clear entire wishlist
export const clearWishlistFromDB = () => axiosInstance.delete(API);
