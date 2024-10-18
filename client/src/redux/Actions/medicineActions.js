import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Fetch Medicines
export const fetchMedicines = createAsyncThunk(
    'medicine/fetchMedicines',
    async (filters = { limit: 5, page: 1 }, { rejectWithValue }) => {
        try {
            const { category, minPrice, maxPrice, inStock, sort, limit, page } = filters;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/medicines`, {
                params: {
                    ...(category && { category }),
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice }),
                    ...(inStock && { inStock }),
                    ...(sort && { sort }),
                    ...(limit && { limit }),
                    ...(page && { page }), // Added page parameter
                }
            });
            return response.data; // Adjusted to match updated API response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Single Medicine
export const fetchSingleMedicine = createAsyncThunk(
    'medicine/fetchSingleMedicine',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/medicines/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add Medicine
export const addMedicine = createAsyncThunk(
    'medicine/addMedicine',
    async (medicineData, { rejectWithValue }) => {
        try {
            
            const config = {
                headers: {
                    "Content-Type":  "multipart/form-data"
                },
                withCredentials:true
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/medicines/add-medicine`, medicineData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Update Medicine

export const updateMedicine = createAsyncThunk(
    'medicine/updateMedicine',
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials:true
            };
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/medicines/update-medicine/${id}`, updates, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


// Delete Medicine
export const deleteMedicine = createAsyncThunk(
    'medicine/deleteMedicine',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/medicines/delete-medicine/${id}`, {withCredentials:true});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
