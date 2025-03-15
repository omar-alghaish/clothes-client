// src/redux/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Load state from localStorage if available (for "remember me" functionality)
if (typeof window !== "undefined") {
  const savedAuth = localStorage.getItem("auth") || sessionStorage.getItem("auth");
  if (savedAuth) {
    try {
      const parsedAuth = JSON.parse(savedAuth);
      initialState.user = parsedAuth.user;
      initialState.token = parsedAuth.token;
      initialState.isAuthenticated = true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("auth");
    }
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, remember } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Store in localStorage if "remember me" is checked
      if (remember && typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify({ user, token }));
      }else{
        sessionStorage.setItem("auth", JSON.stringify({ user, token }));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
      sessionStorage.removeItem("auth");

      state.isAuthenticated = false;

      // Clear localStorage on logout
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
import { RootState } from "../../store";

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
