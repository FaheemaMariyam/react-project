import axiosInstance from "./axiosInstance";

const API = "/cart/";

// get all cart items for the logged-in user
export const getUserCart = () => axiosInstance.get(API);

// add item to cart (or increment quantity if exists)
export const addCartToDB = (product) =>
  axiosInstance.post(API, { product_id: product.id, quantity: 1 });

// update cart item quantity
export const updateCartItem = (productId, delta) =>
  axiosInstance.patch(`${API}${productId}/`, { delta });


// remove single cart item
export const removeCartFromDB = (id) => axiosInstance.delete(`${API}${id}/`);

// clear entire cart
export const clearCartFromDB = () => axiosInstance.delete(API);
