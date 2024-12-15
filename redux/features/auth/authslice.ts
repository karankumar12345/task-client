import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: null,
  message: null, // Changed to null for better type handling
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.user = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload.token; // Extract token from payload
      state.user = action.payload.user;   // Extract user from payload
    },
    userLogout: (state) => {
      state.token = "";
      state.user = null; // Reset user to null on logout
    },
    updateUser: (state, action) => {
      state.message = action.payload;
    },
    avatarUpdate:(state,action)=>{
      state.message = action.payload;
    },
    updatePassword:(state,action)=>{
      state.message = action.payload;
    },
    alluser:(state, action)=>{
      state.message = action.payload;
    }
  },
});

export const { userRegistration, userLogin, userLogout,updateUser,avatarUpdate,updatePassword,alluser } = authSlice.actions;

export default authSlice.reducer;
