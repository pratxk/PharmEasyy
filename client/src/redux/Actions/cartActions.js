import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/cart`, config);
      return response.data; // Return cart data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Medicine to Cart
export const addMedicineToCart = createAsyncThunk(
  "cart/addMedicineToCart",
  async ({ medicineId, quantity, name, developedBy, maxMonthsExpiry, category, imageUrl, price }, { rejectWithValue }) => {
      try {
          const token = JSON.parse(localStorage.getItem("token"));
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          };
          const response = await axios.post(
              `${import.meta.env.VITE_BACKEND_API}/cart/add`,
              { medicineId, quantity, name, developedBy, maxMonthsExpiry, category, imageUrl, price },
              config
          );
          return response.data; // Return updated cart data
      } catch (error) {
          return rejectWithValue(error.message);
      }
  }
);


// Remove Medicine from Cart
export const removeMedicineFromCart = createAsyncThunk(
  "cart/removeMedicineFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (!token) {
        return rejectWithValue("Please login to remove medicine from cart");
      }
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/cart/remove/${cartItemId}`, // Send ID in the URL
        config
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Update Medicine Quantity in Cart
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartItemId, operation }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}/cart/update/${cartItemId}`,
        { operation }, // Send the operation instead of quantity
        config
      );
      return response.data; // Return updated cart data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/cart/clear`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
