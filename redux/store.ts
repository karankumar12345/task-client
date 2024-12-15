"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apislice";
import authSlice from "./features/auth/authslice";


// Ensure that apiSlice and courseApi have unique reducer paths
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Ensure courseApi is used correctly
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
     // Add courseApi middleware
});

const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true }));
  await store.dispatch(apiSlice.endpoints.LoadUser.initiate({}, { forceRefetch: true }));
};

initializeApp();
