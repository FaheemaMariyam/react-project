import React from "react";
import axios  from "axios";
const API="http://localhost:3000/orders";
  export const  addOrderToDB=(order)=>axios.post(API,order);
  export const getOrdersFromDB=()=>axios.get(API);
  export const getUserOrders=(userId)=>axios.get(`${API}?userId=${userId}`)