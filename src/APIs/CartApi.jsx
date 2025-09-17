import axios from "axios";

const API = "http://localhost:3000/cart";

// Add item to cart
export const addCartToDB = (item) => axios.post(API, item);

// Get cart items for a user
export const getUserCart = (userId) => axios.get(`${API}?userId=${userId}`);

// Update cart item (e.g., quantity)
export const updateCartItem = (id, item) => axios.patch(`${API}/${id}`, item);

// Remove item from cart
export const removeCartFromDB = (id) => axios.delete(`${API}/${id}`);

// Clear cart for a user
export const clearCartFromDB = async (userId) => {
  const res = await axios.get(`${API}?userId=${userId}`);
  await Promise.all(res.data.map((item) => axios.delete(`${API}/${item.id}`)));
};
