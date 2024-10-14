import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchMedicines = createAsyncThunk(
    'medicine/fetchMedicines',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const { category, minPrice, maxPrice, inStock, sort, limit } = filters;
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/medicines`, {
                params: {
                    ...(category && { category }),
                    ...(minPrice && { minPrice }),
                    ...(maxPrice && { maxPrice }),
                    ...(inStock && { inStock }),
                    ...(sort && { sort }),
                    ...(limit && { limit })
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const addMedicine = createAsyncThunk(
    'medicine/addMedicine',
    async (medicineData, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/medicines/add-medicine`, medicineData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateMedicine = createAsyncThunk(
    'medicine/updateMedicine',
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/medicine/update-medicine/${id}`, updates, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteMedicine = createAsyncThunk(
    'medicine/deleteMedicine',
    async (id, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/medicine/delete-medicine/${id}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
