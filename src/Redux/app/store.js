import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/AuthSlice";
import productSlice from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
});
