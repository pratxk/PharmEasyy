import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/orders`, {withCredentials:true});
      return response.data.orders; // Return orders data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Order
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/orders/add-order`, orderData, {withCredentials:true});
      return response.data.order; // Return the new order
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchSingleOrder = createAsyncThunk(
    "orders/fetchSingleOrder",
    async (orderId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/orders/single-product/${orderId}`, {withCredentials:true});
        return response.data.order; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// Fetch Orders by User
export const fetchOrdersByUser = createAsyncThunk(
    "orders/fetchOrdersByUser",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/orders/my-orders`, {withCredentials:true});
        return response.data.orders; // Return orders data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.message === "No orders found " ? "No orders found " : error.message);
      }
    }
  );
  

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/orders/update-order/${id}`, { status }, {withCredentials:true});
      return response.data.order; // Return the updated order
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
