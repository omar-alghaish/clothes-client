// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../features/products/productsApi";
import { cartApi } from "../features/cart/cartApi";
import { userApi } from "../features/user/userApi";
import { ordersApi } from "../features/orders/orders.api";
import orderSlice from "../features/orders/orders.slice"
export const store = configureStore({
  reducer: {
    order: orderSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,



  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, cartApi.middleware, userApi.middleware, ordersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
