/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLogin } from './auth/authslice';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://taskman-server-w7jv.onrender.com/api/v1',
    credentials: 'include', // Required for cookies
    prepareHeaders: (headers) => {
      // Assume tokens are stored in cookies and handled server-side
      return headers; // No token management needed here
    },
  }),
  endpoints: (builder) => ({
    // Endpoint for refreshing the token
    refreshToken: builder.query({
      query: () => ({
        url: 'user/refreshToken',
        method: 'GET',
        credentials: 'include', // Use cookies for session management
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // Token handling is managed server-side; no need for client storage
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      },
    }),

    // Load user details
    LoadUser: builder.query({
      query: () => ({
        url: 'user/me',
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Dispatch user data to the store
          dispatch(
            userLogin({
              token: result.data.token || "guest",
              user: result.data.user || "guest",
            })
          );
        } catch (error) {
          console.error("Error loading user:", error);
        }
      },
    }),
  }),
});

// Export hooks for the queries you created
export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;

// Logout Function
export const logout = () => {
  // No client-side token cleanup required; relies on server-side session termination
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'https://backendlearn-g3wj.onrender.com/api/v1/'}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  }).catch((err) => console.error("Logout failed:", err));
};
