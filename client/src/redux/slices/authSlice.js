import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, fetchCurrentUser, fetchAllUsers, deleteUser, forgotPassword, resetPassword, validateToken } from "../Actions/authActions";

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
  singleUser: {},
  allUsers: [],
  isAuth: !!getStoredUser(),
  role: '',
  error: null,
  isRegistered: false,
  forgotPasswordStatus: null,
  validToken :false,
  resetPasswordStatus: null,
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
        storeUser(action.payload);
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

      //forgotPassword Actions
      .addCase(forgotPassword.pending, (state) => {
        state.error = null;
        state.forgotPasswordStatus = 'pending';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordStatus = 'success';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.forgotPasswordStatus = 'failed';
      })
      .addCase(validateToken.pending,(state)=>{
        state.validToken = false
      })
      .addCase(validateToken.fulfilled,(state, action)=>{
        state.validToken = action.payload.status === true
      })
      .addCase(validateToken.rejected,(state)=>{
        state.validToken = false
      })
      
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
        state.resetPasswordStatus = 'pending';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordStatus = 'success';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.resetPasswordStatus = 'failed';
      })


      .addCase(fetchCurrentUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {

        storeUser(action.payload)

        state.role = action.payload.role;
        state.isAuth = true;
        state.user = action.payload;
        state.singleUser = action.payload;

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
