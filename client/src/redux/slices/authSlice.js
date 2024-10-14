import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../Actions/authActions";

// Helper functions for localStorage handling
function getStoredUser() {
  let exist = localStorage.getItem("user");
  if (exist) {
    return JSON.parse(exist);
  }
  return null;
}

function storeUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function removeUser() {
  localStorage.removeItem("user");
}

// Initial state
const initialState = {
  user: getStoredUser(),
  isAuth: !!getStoredUser(),
  error: null,
  isRegistered:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistered = true; 
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        storeUser(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null; 
        state.isAuth = false; 
        state.isRegistered = false;
        removeUser(); 
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
