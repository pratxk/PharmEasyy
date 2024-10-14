import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCart,
  addMedicineToCart,
  removeMedicineFromCart,
  updateCartQuantity,
  clearCart,
} from "../Actions/cartActions";

const initialState = {
  cart: null,
  isExist:false,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Medicine to Cart
      .addCase(addMedicineToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMedicineToCart.fulfilled, (state, action) => {
        state.cart = action.payload; 
        state.isLoading = false;
      })
      .addCase(addMedicineToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Remove Medicine from Cart
      .addCase(removeMedicineFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeMedicineFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.cart) {
          state.cart = state.cart.filter((item) => item._id !== action.payload.deletedItem._id);
        }
      })
      .addCase(removeMedicineFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Medicine Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.cart) {
          // Update the quantity of the item that was updated
          const updatedItem = action.payload.updatedItem; // Assuming your API returns the updated item
          const itemIndex = state.cart.findIndex((item) => item._id === updatedItem._id);
          if (itemIndex !== -1) {
            state.cart[itemIndex].qty = updatedItem.qty; // Update quantity
          }
        }
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null; 
        state.isLoading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
