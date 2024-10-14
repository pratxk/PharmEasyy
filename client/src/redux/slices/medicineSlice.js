import { createSlice } from "@reduxjs/toolkit";
import { fetchMedicines, addMedicine, updateMedicine, deleteMedicine } from "../Actions/medicineActions";
import { addMedicineToCart } from "../Actions/cartActions";

const initialState = {
  medicines: [],
  isLoading: false,
  error: null,
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  }
});

export default medicineSlice.reducer;
