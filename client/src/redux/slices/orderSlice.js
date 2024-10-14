import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,
  addOrder,
  updateOrderStatus,
  fetchSingleOrder,
} from "../Actions/orderActions";

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
  singleOrderItem:{},
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //fetching single Order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.singleOrderItem = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Add Order
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload); 
        state.isLoading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder; 
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
