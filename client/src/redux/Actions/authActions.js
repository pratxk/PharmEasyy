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
      // alert('Login Successfully');
      localStorage.setItem('token', JSON.stringify(response.data.token));
      // localStorage.setItem('role', JSON.stringify(response.data.role));
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
    // Remove invalid token
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