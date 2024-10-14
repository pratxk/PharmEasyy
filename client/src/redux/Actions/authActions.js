import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const register = createAsyncThunk('auth/register',
     async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/register`, credentials);
        alert('Registered Successfully');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message); 
    }
 } 
);
export const login = createAsyncThunk('auth/login',
     async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/login`, credentials);
        alert('Login Successfully');
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('role', JSON.stringify(response.data.role));
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
  
 
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        
        return true; 
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );
  