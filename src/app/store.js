import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import userSlice from './features/auth/authSlice'
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth:userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
