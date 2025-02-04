// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// call the refersh token function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
  );

  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
