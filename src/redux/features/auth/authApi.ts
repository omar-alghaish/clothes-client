// src/redux/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://clothes-server-production.up.railway.app/api/v1";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from state
      const token = (getState() as { auth: { token: string } }).auth.token;
      
      // If token exists, add authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          passwordConfirm: userData.confirmPassword, // Adjusting field name to match API expectations
          role: "user", // Default role
        },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "/users/me",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;