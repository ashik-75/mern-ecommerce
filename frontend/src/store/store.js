import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./authStore/auth";
import { authSliceReducer } from "./authStore/authSlice";
import { addToCartReducer } from "./cartStore/addToCart";
import { categoryStore } from "./categoryStore/categoryStore";
import { orderStore } from "./orderStore/orderStore";
import { productStore } from "./productStore/productStore";
import { usersStore } from "./usersStore/usersStore";

const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [usersStore.reducerPath]: usersStore.reducer,
    [productStore.reducerPath]: productStore.reducer,
    [orderStore.reducerPath]: orderStore.reducer,
    [categoryStore.reducerPath]: categoryStore.reducer,
    authSlice: authSliceReducer,
    addToCart: addToCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      usersStore.middleware,
      productStore.middleware,
      orderStore.middleware,
      categoryStore.middleware
    ),
});

export default store;
