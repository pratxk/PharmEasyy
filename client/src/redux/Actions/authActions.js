import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const register = createAsyncThunk('auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/register`, credentials);
      // alert('Registered Successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk('auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/login`, credentials, { withCredentials: true });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.get(`${import.meta.env.VITE_BACKEND_API}/auth/logout`, config);
      // localStorage.removeItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ userId, token, password }, { rejectWithValue }) => {
    try {
      // Make sure to include the userId and token in the URL path
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/reset-password/${userId}/${token}`,
        { newPassword: password } // Sending the new password in the body
      );
      return response.data; // Return the response data upon success
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


//  fetching current user
export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      return rejectWithValue('No token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/auth/me`, config);
    return response.data;

  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return rejectWithValue('Token expired or invalid');
  }
});


// New action for fetching all users
export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (_, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/auth/get-all-users`, config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (id, { rejectWithValue }) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/auth/delete-user/${id}`,config);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})