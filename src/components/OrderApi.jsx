
import axios from "axios";
const API = "http://localhost:3000/orders";

export const addOrderToDB = (order) => axios.post(API, order);
export const getOrdersFromDB = () => axios.get(API);
export const getUserOrders = (userId,username) => axios.get(`${API}?userId=${userId}&username=${username}`);

export const updateOrderStatus = (orderId, status) =>
  axios.patch(`${API}/${orderId}`, { status });
