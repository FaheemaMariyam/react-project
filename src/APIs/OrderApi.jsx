
import axios from "axios";
const API = "https://dbrender-liu7.onrender.com/orders";

export const addOrderToDB = (order) => axios.post(API, order);
export const getOrdersFromDB = () => axios.get(API);
export const getUserOrders = (userId,username) => axios.get(`${API}?userId=${userId}&username=${username}`);

export const updateOrderStatus = (orderId, status) =>
  axios.patch(`${API}/${orderId}`, { status });
