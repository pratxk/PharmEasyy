import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, fetchCurrentUser, fetchAllUsers, deleteUser } from "../Actions/authActions";

// Helper functions for localStorage handling
function getStoredUser() {
  let exist = localStorage.getItem("user");
  if (exist) {
    return JSON.parse(exist);
  }
  return null;
}


function removeUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
}

// Initial state
const initialState = {
  user: {},
  singleUser: {},
  allUsers: [],
  isAuth: !!getStoredUser(),

  role: '',

  error: null,
  isRegistered: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
        state.role = action.payload.role;
        state.isAuth = true;
        // console.log(state.role)

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
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log(state.user)
        state.role = action.payload.role;
        state.isAuth = true;
        state.singleUser = action.payload;
        console.log(state.singleUser)

      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (state.allUsers) {
          state.allUsers = state.allUsers.filter((item) => item._id !== action.payload.user._id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      
  }
});

export default authSlice.reducer;
