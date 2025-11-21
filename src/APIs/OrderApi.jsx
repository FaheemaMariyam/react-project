import axiosInstance from "./axiosInstance";

const API = "/orders/";

// Get user orders
export const getUserOrders = () => axiosInstance.get(API);


// Add a new order
export const addOrderToDB = (order) => axiosInstance.post(API, order);

// Update order status
export const updateOrderStatus = (orderId, status) =>
  axiosInstance.patch(`${API}${orderId}/status/`, { status });
