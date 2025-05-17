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
import { aiApi } from "../features/ai/aiApi";
import { favoritesApi } from "../features/favorites/favoritesApi";
import { addressesApi } from "../features/addresses/addressesApi";
import { paymentApi } from "../features/payment/paymentApi";
import { aiApi2 } from "../features/ai/aiApi2";
import { reviewsApi } from "../features/reviews/reviewsApi";
import { categoryApi } from "../features/category/categoryApi";
import { profileOrdersApi } from "../features/profileOrders/profileOrdersApi";
import { statusApi } from "../features/profileOrders/statusApi";
export const store = configureStore({
  reducer: {
    order: orderSlice,
    auth: authSlice,
      [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [aiApi.reducerPath]: aiApi.reducer,
    [aiApi2.reducerPath]: aiApi2.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [addressesApi.reducerPath]: addressesApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [profileOrdersApi.reducerPath]: profileOrdersApi.reducer,
    [statusApi.reducerPath]: statusApi.reducer,



  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, cartApi.middleware, userApi.middleware, ordersApi.middleware, aiApi.middleware, aiApi2.middleware, favoritesApi.middleware, addressesApi.middleware, paymentApi.middleware, reviewsApi.middleware, categoryApi.middleware, profileOrdersApi.middleware, statusApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
