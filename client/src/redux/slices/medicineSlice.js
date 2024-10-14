import { createSlice } from "@reduxjs/toolkit";
import {
    fetchMedicines,
    fetchSingleMedicine,
    addMedicine,
    updateMedicine,
    deleteMedicine,
} from "../Actions/medicineActions";

const initialState = {
    medicines: [],
    isLoading: false,
    singleMedicine: {},
    error: null,
};

const medicineSlice = createSlice({
    name: 'medicine',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Medicines
            .addCase(fetchMedicines.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMedicines.fulfilled, (state, action) => {
                state.medicines = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchMedicines.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch Single Medicine
            .addCase(fetchSingleMedicine.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSingleMedicine.fulfilled, (state, action) => {
                state.singleMedicine = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchSingleMedicine.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add Medicine
            .addCase(addMedicine.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addMedicine.fulfilled, (state, action) => {
                state.medicines.push(action.payload.newMedicine); // Assuming response structure
                state.isLoading = false;
            })
            .addCase(addMedicine.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Update Medicine
            .addCase(updateMedicine.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateMedicine.fulfilled, (state, action) => {
                const index = state.medicines.findIndex(medicine => medicine._id === action.payload.updatedMedicine._id);
                if (index !== -1) {
                    state.medicines[index] = action.payload.updatedMedicine; // Update the existing medicine
                }
                state.isLoading = false;
            })
            .addCase(updateMedicine.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete Medicine
            .addCase(deleteMedicine.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMedicine.fulfilled, (state, action) => {
                state.medicines = state.medicines.filter(medicine => medicine._id !== action.payload.deletedMedicine._id); // Assuming response structure
                state.isLoading = false;
            })
            .addCase(deleteMedicine.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export default medicineSlice.reducer;
