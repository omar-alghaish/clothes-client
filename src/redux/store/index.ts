// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
